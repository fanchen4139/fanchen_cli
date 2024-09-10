// import fg from "fast-glob";
// import {resolve} from "path";
// const dirs = fg.sync('*', { cwd: resolve(__dirname, '../navbar/'), onlyDirectories: true })
// const transformEnum = {
//   'home': '首页',
//   'guide': '指南',
//   'component': '组件',
// }
// const navbar = []
//
// dirs.forEach(dirName => {
//   navbar.push({
//     text: transformEnum[dirName],
//     link: `/${dirName}/`
//   })
// })


export const navbar = [
  // ['/', '首页'],
  // ['/guide/', '指南'],
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/component/Basic/button.md' },
]
export default navbar