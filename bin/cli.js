#! /usr/bin/env node

const commander = require('commander') // 自定义指令
const init = require('../lib/init.js')

commander
  .version('0.1.0')
  .command('init <project_name>')
  .description('create a new project')
  .option('-f --force', 'overwrite target directory if it exist')
  .action((name, option) => {
    init(name, option)
  })



const chalk = require('chalk') // chalk 改变颜色
const figlet = require('figlet') // figlet 改变字体

commander.on('--help', () => { // 监听 --help 执行

  console.log('\r\n' + figlet.text('FanChen_FRONTED_CLI', {
    font: '3-D',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 500,
    whitespaceBreak: true
  }))

  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`fanchen_fronted <command> --help`)} for detailed usage of given command\r\n`)
})

commander.parse()