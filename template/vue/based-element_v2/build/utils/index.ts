// import {spawn} from "child_process";
// import {projectRoot} from "./paths";
// // @ts-ignore
// export const withTaskName = <T>(taskName: string | ``, fn: T) => Object.assign(fn, {displayName: taskName})
//
// // 在node中使用子进程运行脚本
// export const run = async (command: string) => {
//   return new Promise((resolve) => {
//     const [cmd, ...args] = command.split(' ')
//     const app = spawn(cmd, args, {
//       cwd: projectRoot,
//       stdio: 'inherit', // 直接将这个子进程的输出共享给父进程
//       shell: true, // 默认情况下 linux 才支持 rm -rf (需要安装git bash)
//     })
//     app.on('close', resolve)
//   })
// }


/*
 * 子进程
 * child_process.spawn(command[, args][, options])
 * command <string> 要运行的命令。
 * args <string[]> 字符串参数列表。
 * options <Object>
 *  - cwd <string> | <URL> 子进程的当前工作目录
 *  - stdio <Array> | <string> 子进程的标准输入输出配置。'inherit'：通过相应的标准输入输出流传入/传出父进程
 *  - shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用    process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）x
 */
import {spawn} from 'child_process'
import type {TaskFunction} from 'gulp'
import {projectRoot, buildRoot} from './paths'
// 自定义每个task的name
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, {displayName: name})
// 在node中开启一个子进程来运行脚本
export const run = async (command: string, cwd: string = projectRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    const onProcessExit = () => app.kill('SIGHUP')
    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)
      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    process.on('exit', onProcessExit)
  })
// 执行方法
export const runTask = (name: string) => {
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )
}

// 重写打包后的@element-fc_v2 路径
export const pathRewriter = (format) => {
  return (id: any) => {
    id = id.replaceAll("@element-fc_v2", `element-fc_v2/${format}`);
    return id;
  };
};
