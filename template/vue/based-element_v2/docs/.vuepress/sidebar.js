import fg from "fast-glob";
import {resolve} from "path";

const levelOneTitleEnum = {
  'Basic': { title: '基础组件', path: 'Basic/Button.md'},
  'Form': { title: '表单组件', path: 'Form/test.md'},
  'Data': { title: '数据展示', path: 'Data/test.md'},
  'Feedback': { title: '反馈组件', path: 'Feedback/test.md'},
}

const levelTwoTitleEnum = {
  'Button': '按钮',
  'test': '测试'
}
function getDirs(dirname) {
  return fg.sync('*', { cwd: resolve(__dirname, `../${dirname}/`), onlyDirectories: true })
}

function getFiles(filename) {
  return fg.sync('**', { cwd: resolve(__dirname, `../${filename}/`), onlyFiles: true })
}

function getGuideSidebar() {
  return []
}
function getComponentSidebar() {
  return getDirs('component').map(dirname => {
    return {
      title: `${dirname}  ${levelOneTitleEnum[dirname].title}`,
      collapsable: false,
      sidebarDepth: -1,
      children: getFiles('component').map(fullPath => {
        const [folderName, filename] = fullPath.replace('.md', '').split('/')
        if(folderName === dirname) {
          return {
            title: `${filename}  ${levelTwoTitleEnum[filename]}`,
            path: `/component/${fullPath}`,
          }
        }
      }).filter(item => item)
    }
  })
}


export const sidebar = {
  '/guide/': getGuideSidebar(),
  '/component/': getComponentSidebar()
}
export default sidebar