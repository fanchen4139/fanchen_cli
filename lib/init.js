const {select, Separator} = require('@inquirer/prompts')
const {tmplMap} = require("./constant")
const {copyTmpl} = require("./utils");

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
  copyTmpl(answers, projectName)

}