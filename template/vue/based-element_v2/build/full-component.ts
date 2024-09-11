import {nodeResolve} from "@rollup/plugin-node-resolve";
// 处理文件路径
import commonjs from "@rollup/plugin-commonjs";
// 将 CommonJS 模块转换为 ES6
import vue from "rollup-plugin-vue";
import RollupPluginPostcss from 'rollup-plugin-postcss';
// 解决组件内部如果有css 打包会报错的css插件
import typescript from "rollup-plugin-typescript2";
import {parallel, series} from "gulp";
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from "path";
import {buildOutput, getInputPath, rtzhRoot} from "./utils/paths";
import {rollup, OutputOptions} from "rollup";
import fs from "fs/promises";
import terser from '@rollup/plugin-terser';
// 压缩js代码
import cleanup from 'rollup-plugin-cleanup';
// 去除无效代码
import {buildConfig} from "./utils/config";
import {pathRewriter} from "./utils";
// import DefineOptions from 'unplugin-vue-define-options/vite'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild, {minify as minifyPlugin} from 'rollup-plugin-esbuild'
import DefineOptions from "unplugin-vue-define-options/vite"

const overrides = {

  compilerOptions: {
    declaration: true
  }, // 生成.d.ts的文件
  exclude: ['tests/**/*.ts', 'tests/**/*.tsx']
}

const buildFull = async () => {
  try {

    // rollup 打包的配置信息
    const config = {
      input: getInputPath(path.resolve(rtzhRoot, "index.ts")),
      // 打包入口
      plugins: [
        VueMacros({
          setupComponent: false,
          setupSFC: false,
          plugins: {
            // vue: vue({
            //   // isProduction: false,
            // }),
            // vueJsx: vueJsx(),
          },
        }),
        nodeResolve(),
        vue(),
        // DefineOptions(),
        typescript({
          tsconfigOverride: overrides,
          check: false
        }),
        RollupPluginPostcss({
          extract: true,
          plugins: [autoprefixer, cssnano()]
        }),
        commonjs(),
        cleanup(),
        terser({
          // compress: {
          //   drop_console: true
          // }
        }),
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
        // 压缩js代码 及删除console
      ],
      external: (id: string) => /^vue/.test(id),
      // 打包的时候不打包vue代码
    };
    // 组件库两种使用方式 import 导入组件库 在浏览器中使用script
// esm umd
    const buildConfig = [
      {
        format: "umd",
        // 打包的格式
        file: path.resolve(buildOutput, "index.js"),
        name: "zhxd-plus",
        // 全局变量名字
        exports: "named",
        // 导出的名字 用命名的方式导出
        // libraryTarget: "",
        globals: {
          // 表示使用的vue是全局的
          vue: "Vue",
        },
      },
      {
        format: "es",
        file: path.resolve(buildOutput, "index.esm.js"),
      },
    ];
    let bundle = await rollup(config);
    return Promise.all(
      buildConfig.map((option) => {
        bundle.write(option as OutputOptions);
      })
    );
  } catch (e) {
    throw new Error(e)
  }
};

async function buildEntry() {

  // 读取element-fc_v2目录下的所有内容，包括目录和文件
  const entryFiles = await fs.readdir(rtzhRoot, {withFileTypes: true});

// 过滤掉 不是文件的内容和package.json文件  index.js 作为打包入口
  const entryPoints = entryFiles.filter((f) => f.isFile()).filter((f) => !["package.json"].includes(f.name)).map((f) => path.resolve(rtzhRoot, f.name));
  const config = {
    input: getInputPath(entryPoints),
    plugins: [
      nodeResolve(),
      vue(),
      typescript({
        tsconfigOverride: overrides,
        check: false
      }),
      cleanup(),
      terser({
        // compress: {
        //   drop_console: true
        // }
      })
      // 压缩js代码 及删除console
    ],
    external: (id: string) => /^vue/.test(id) || /^@element-fc_v2/.test(id),
  };
  const bundle = await rollup(config);
  return Promise.all(Object.values(buildConfig).map((config) => ({
    format: config.format,
    dir: config.output.path,
    paths: pathRewriter(config.output.name),
    // external: config.external,
  })).map((option) => bundle.write(option as OutputOptions)));
}

// gulp适合流程控制和代码的转义  没有打包的功能
export const buildFullComponent = parallel(buildFull, buildEntry);
// export const buildFullComponent = parallel(buildFull);