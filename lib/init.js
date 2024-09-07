const {select, rawlist, confirm} = require('@inquirer/prompts')
const {tmplMap} = require("./constant")
const {copyTmpl} = require("./utils");
const {installDependencies} = require('nypm')
const path = require('path')
module.exports = async function (projectName, options) {
  const answers = []

  const frame = await select({
    message: 'Select a frame',
    choices: [
      {
        name: 'Vue',
        value: 'vue',
        description: 'Vue-based custom project scaffolding',
      },
      {
        name: 'Nuxt',
        value: 'nuxt',
        description: 'Nuxt-based custom project scaffolding',
      },
    ],
  })
  answers.push(frame)

  const tmplName = await select({
    message: 'Select a template',
    choices: tmplMap[frame]
  })
  answers.push(tmplName)

  const flag = await confirm({message: 'Do you want to auto initialize fresh project？'})
  if (!flag) {
    copyTmpl(answers, projectName)
  } else {
    const projectManager = await rawlist({
      message: 'Select a package manager',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
      ],
    });
    copyTmpl(answers, projectName, false)
    try {
      await installDependencies({
        cwd: path.join(process.cwd(), projectName),
        packageManager: {
          name: projectManager,
          command: projectManager
        }
      })
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}