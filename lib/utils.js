const path = require('path');
const fs = require('fs-extra') // npm install fs-extra
const cwd = process.cwd() // 运行命令行所在的目录

/**
 * 复制模板文件
 */
function copyTmpl(answers, projectName) {
  const sourcePath = path.join(__dirname, '../template', ...answers)
  copyDir(sourcePath, projectName)
  console.log('执行完毕')
}

/**
 * 复制
 * @param src
 * @param dist
 * @param callback
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist, {
        recursive: true
      })
    }
    _copy(null, src, dist)
  })

  const _copy = (err, src, dist) => {
    if (err) {
      callback(err)
    } else {
      let dir = fs.readdirSync(src, 'utf-8')
      for (let j of dir) {
        var _src = src + '/' + j
        var _dist = dist + '/' + j
        let stat = fs.statSync(_src)
        if (stat.isDirectory()) {
          copyDir(_src, _dist, callback)
        } else {
          fs.writeFileSync(_dist, fs.readFileSync(_src, {
            encoding: 'utf-8'
          }))
        }
      }
    }
  }
}

module.exports = {
  copyTmpl
}