// 专门打包util、指令、hook
import path from "path";
import {series, parallel, src, dest} from "gulp";
import {buildConfig} from "./utils/config";
import {outDir, projectRoot} from "./utils/paths";
import ts from "gulp-typescript";
import {withTaskName, run} from "./utils";

export const buildPackages = (dirname:string, name:string) => {

  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name); // 指定输出路径
    return series(
      withTaskName(`build:${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json'); // ts配置文件的路径
        const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules"]; // 指定被打包的文件

        return src(inputs).pipe(ts.createProject(tsConfig, {
          declaration: true, // 需要生成配置文件
          strict: false,
          module: config.module
        })()).pipe(dest(output))
      }),
      withTaskName(`copy:${dirname}`, () => {
          // 放到es -> utils 和 lib -> utils
          return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
        }),
    )
  })

  return parallel(...tasks)
}