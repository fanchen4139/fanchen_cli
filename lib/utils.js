const path = require('path');
const fs = require('fs-extra') // npm install fs-extra
const cwd = process.cwd() // 运行命令行所在的目录
const simpleGit = require('simple-git')
const { SingleBar, Presets } = require('cli-progress');
/**
 * 复制模板文件
 */
function copyTmpl(answers, projectName, defaultTip) {
  defaultTip = defaultTip ?? true
  const sourcePath = path.join(__dirname, '../template', ...answers)
  copyDir(sourcePath, projectName)
  if (defaultTip) console.log('succeed create fresh project!')
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


function cloneRepository(repoUrl, targetDir, branch = 'master') {
  const git = simpleGit();
  const progressBar = new SingleBar({}, Presets.shades_classic);

  // 清除目标目录
  fs.rmSync(targetDir, { recursive: true, force: true });

  // 设置 outputHandler 用于进度显示
  git.outputHandler((command, stdout, stderr) => {
    stderr.on('data', (data) => {
      const message = data.toString();
      const match = message.match(/(Receiving objects:\s+(\d+)%|接收对象中:\s+(\d+)%)/)
      if (match) {
        const percent = parseInt(match[3], 10);
        if (!progressBar.isActive) {
          progressBar.start(100, percent);
        } else {
          progressBar.update(percent);
        }
      }
    });
  });

  // 执行克隆命令
  git.clone(repoUrl, targetDir, ['--branch', branch, '--progress'])
    .then(() => {
      progressBar.stop();
      console.log(`Cloned branch ${branch} from ${repoUrl} into ${targetDir}`);
    })
    .catch((err) => console.error('Clone failed', err));
}

module.exports = {
  copyTmpl,
  cloneRepository
}