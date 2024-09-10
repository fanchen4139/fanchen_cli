/** * 安装依赖 pnpm install fast-glob ts-morph -w -D */
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import RollupPluginPostcss from 'rollup-plugin-postcss';
// 解决组件内部如果有css 打包会报错的css插件
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import {series, parallel} from "gulp";
import {sync} from "fast-glob";
// 同步查找文件
import {compRoot, getInputPath, outDir, projectRoot} from "./utils/paths";
import path from "path";
import {rollup, OutputOptions} from "rollup";
import {buildConfig} from "./utils/config";
import {pathRewriter, run} from "./utils";
import {Project, SourceFile} from "ts-morph";
import {terser} from 'rollup-plugin-terser';
// 压缩js代码
import cleanup from 'rollup-plugin-cleanup';
// 去除无效代码
import glob from "fast-glob";
import * as VueCompiler from "@vue/compiler-sfc";
import fs from "fs/promises";


import VueMacros from "unplugin-vue-macros/rollup"
import DefineOptions from "unplugin-vue-define-options/vite"
import esbuild, {minify as minifyPlugin} from 'rollup-plugin-esbuild'

const overrides = {

  compilerOptions: {
    declaration: true
  }, // 生成.d.ts的文件
  exclude: ['tests/**/*.ts', 'tests/**/*.tsx']
}
const buildEachComponent = async () => {  // 打包每个组件
  // 查找components下所有的组件目录 ["icon"]
  const files = sync("*", {
    cwd: compRoot, onlyDirectories: true, // 只查找文件夹
  });
  // 分别把components文件夹下的组件，放到dist/es/components下 和 dist/lib/components
  const builds = files.map(async (file: string) => {
    // 找到每个组件的入口文件 index.js
    const input = path.resolve(compRoot, file, "index.ts");
    const config = {
      input,
      plugins: [
        VueMacros({
          setupComponent: false,
          setupSFC: false,
          plugins: {
            vue: vue({
              // isProduction: false,
            }),
            // vueJsx: vueJsx(),
          },
        }),
        nodeResolve(),
        // vue(),
        typescript({
          tsconfigOverride: overrides,
          check: false
        }),
        // DefineOptions(),
        RollupPluginPostcss({
          extract: true,
          plugins: [autoprefixer, cssnano()]
        }),
        commonjs(),
        esbuild({
          exclude: [],
          sourceMap: false,
          target: 'es2018',
          loaders: {
            '.vue': 'ts',
          },
          define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
          },
          treeShaking: true,
          legalComments: 'eof',
        }),
//  cleanup(),
        terser({compress: {drop_console: true}}) // 压缩js代码 及删除console
      ],
      external: (id) => /^vue/.test(id) || /^@element-fc_v2/.test(id),
// 排除掉vue和@element-fc_v2的依赖
    }
    // console.log(config)
    const bundle = await rollup(config);
    const options = Object.values(buildConfig).map((config) => {
      return {
        format: config.format,
        file: path.resolve(config.output.path, `components/${file}/index.js`),
        paths: pathRewriter(config.output.name),
// @element-fc_v2 => element-fc_v2/es element-fc_v2/lib  处理路径
        exports: "named",
      }
    });
    await Promise.all(
      options.map((option) => bundle.write(option as OutputOptions))
    );
  });
  return Promise.all(builds);
};

async function genTypes() {
  const project = new Project({
// 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, "./"),
      baseUrl: projectRoot,
      paths: {
        "@element-fc_v2/*": ["packages/*"],
      },
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: path.resolve(projectRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  const filePaths = await glob("**/*", {
    // ** 任意目录  * 任意文件
    cwd: compRoot,
    onlyFiles: true,
    absolute: true,
  });

// const filePathsDTS = await glob("**/*", {
// ** 任意目录  * 任意文件  //
// cwd: path.resolve(projectRoot, "packages/types"),
//   onlyFiles: true,
//   absolute: true,
// });
// filePaths.push(filePathsDTS[0])
  const sourceFiles: SourceFile[] = [];
  await Promise.all(
    filePaths.map(async function (file) {
      if (file.endsWith(".vue")) {
        const content = await fs.readFile(file, "utf8");
        // @ts-ignore
        // const sfc = VueCompiler.parse(content);
        const sfc = VueCompiler.parseComponent(content);
        // console.log('抽象语法树', sfc)
        // @ts-ignore
        // const {script} = sfc.descriptor || {};
        const {script} = sfc || {};
        if (script) {
          console.log('fileName',file)
          let content = script.content;
          // 拿到脚本
          //   icon.vue.ts
          // =>
          //   icon.vue.d.ts
          const sourceFile = project.createSourceFile(file + ".ts", content);
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        // 把所有的ts文件都放在一起 发射成.d.ts文件
        sourceFiles.push(sourceFile);
      }
    })
  );
  await project.emit({
// 默认是放到内存中的
    emitOnlyDtsFiles: true,
  });
  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });
      await fs.writeFile(filepath, pathRewriter("es")(outputFile.getText()));
    });
    await Promise.all(tasks);
  });
  await Promise.all(tasks);
}

function copyTypes() {
  const src = path.resolve(outDir, "components/");
  const copy = (module) => {
    let output = path.resolve(outDir, module, "components");
    return () => run(`cp -r ${src}/* ${output}`);
  };
  return parallel(copy("es"), copy("lib"));
}

async function buildComponentEntry() {
  const config = {
    input: getInputPath(path.resolve(compRoot, "index.ts")),
    plugins: [
      typescript({
        tsconfigOverride: overrides,
        check: false
      }),
      cleanup(),
      terser({
        compress: {drop_console: true}
      })
// 压缩js代码 及删除console
    ],
    external: () => true,
  };
  const bundle = await rollup(config);
  return Promise.all(
    Object.values(buildConfig).map((config) => ({
      format: config.format,
      file: path.resolve(config.output.path, "components/index.js"),
    })).map((config) => bundle.write(config as OutputOptions))
  );
}

export const buildComponent = series(
  buildEachComponent,
  genTypes,
  copyTypes(),
  buildComponentEntry
);
