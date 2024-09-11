import {series, parallel, src, dest} from "gulp";
import {withTaskName, run} from "./utils"
import {outDir, rtzhRoot} from "./utils/paths";
import {genTypes} from "./gen-types";
import {resolve} from "path";

// const copySourceCode = () => async () => {
//   await run(`cp ${rtzhRoot}/package.json ${outDir}/package.json`);
// }
const copySourceCode = () => async () => {
  await src(resolve(rtzhRoot, './package.json')).pipe(dest(outDir))
}

// gulp作用: 代码转化

// 1、打包样式 2、打包工具函数 3、打包所有组件 4、打包单个组件 5、生成组件库 6、发布组件库
export default series(
  // 删除dist目录
  withTaskName('clean', () => run('rimraf ./dist')),
  parallel(
    // 选择packages文件夹，并行执行所有build脚本
    withTaskName('buildPackages', () => run('pnpm run --filter "./packages/*" --parallel build')), //--parallel
    withTaskName("buildThemeChalk", () => run("pnpm run -C packages/theme-chalk build")),
    withTaskName("buildFullComponent", () => run("pnpm run build buildFullComponent")),
    withTaskName("buildComponent", () => run("pnpm run build buildComponent")),
  ),
  parallel(genTypes, copySourceCode()),
)
// 任务执行器 gulp 任务名 就会执行对应的任务export * from "./full-component";

// 任务执行器 gulp 任务名 就会执行对应的任务
export * from "./full-component";//新增的自定义任务
export * from "./components"; //新增
