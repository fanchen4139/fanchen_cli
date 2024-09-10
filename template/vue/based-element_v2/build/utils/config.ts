import path from "path";
import {outDir} from "./paths";
export const buildConfig = {
  esm: {
    module: "ESNext", // tsconfig输出的结果 es6模块
    format: "esm", // 配置格式化后的模块规范
    output: {
      name: "es", // 打包到dist目录下的哪个目录
      path: path.resolve(outDir, "es")
    },
    bundle: {
      path: 'element-fc_v2/es',
    }
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    output: {
      name: "lib",
      path: path.resolve(outDir, "lib")
    },
    bundle: {
      path: 'element-fc_v2/lib',
    }
  }
}