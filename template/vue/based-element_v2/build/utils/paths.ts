import {resolve} from "path"
import fs from "fs";
export const projectRoot = resolve(__dirname, '../../')
export const buildRoot = resolve(projectRoot, 'internal', 'build')
/* `/dist` */
export const buildOutput = resolve(projectRoot, 'dist')
// __dirname: 执行函数所在的路径
export const outDir = resolve(__dirname, "../../dist")
// element-fc_v2 入口 index.js
export const rtzhRoot = resolve(projectRoot,'packages/element-fc')
// 组件目录
export const compRoot = resolve(projectRoot,'packages/components')

export const getInputPath = (path) => {
  const regex = /\.ts$|\.js$/ // 匹配文件名后缀
  if(Array.isArray(path)) {
    path = path[0]
  } else if(typeof path === 'object') {
    path = path.path
  }
  const suffix = path.match(regex)[0]
  const suffixReplaceEnum = {
    '.ts': '.js',
    '.js': '.ts',
  }
  return fs.existsSync(path) ? path : path.replace(suffix, suffixReplaceEnum[suffix])
}