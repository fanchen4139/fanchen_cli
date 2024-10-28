const { select, rawlist, confirm } = require('@inquirer/prompts');
const { tmplMap } = require('./constant');
const { copyTmpl, cloneRepository } = require('./utils');
const { installDependencies } = require('nypm');
const path = require('path');
const fs = require('fs');

// 导出一个异步函数，用于项目初始化
module.exports = async function (projectName, options) {
  const answers = [];

  // 第一步：选择框架
  const frame = await select({
    message: 'Select a frame',
    choices: [
      { name: 'Vue', value: 'vue', description: 'Vue-based custom project scaffolding' },
      { name: 'Nuxt', value: 'nuxt', description: 'Nuxt-based custom project scaffolding' },
    ],
  });
  answers.push(frame);

  // 第二步：选择对应框架的模板仓库
  const repositoryUrl = await select({
    message: 'Select a template',
    choices: tmplMap[frame],
  });
  answers.push(repositoryUrl);

  // 第三步：询问是否自动初始化新项目
  const autoInitialize = await confirm({ message: 'Do you want to auto initialize fresh project?' });

  if (!autoInitialize) {
    // 手动初始化流程：检查并创建目录，或确认覆盖已存在的目录
    if (!fs.existsSync(projectName)) {
      fs.mkdirSync(projectName, { recursive: true });
    } else {
      const overwrite = await confirm({ message: 'Dir exists. Do you want to overwrite it?' });
      if (!overwrite) process.exit(1); // 若选择不覆盖，则退出流程
    }

    // 克隆模板仓库到指定目录
    await cloneRepository(repositoryUrl, projectName);
  } else {
    // 自动初始化流程：选择包管理工具，克隆仓库并安装依赖
    const projectManager = await rawlist({
      message: 'Select a package manager',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
      ],
    });

    // 克隆模板仓库到项目目录
    await cloneRepository(repositoryUrl, projectName);

    try {
      // 安装项目依赖，使用选定的包管理器
      await installDependencies({
        cwd: path.join(process.cwd(), projectName),
        packageManager: {
          name: projectManager,
          command: projectManager,
        },
      });
    } catch (error) {
      console.error('Error installing dependencies:', error);
      process.exit(1); // 安装失败则退出
    }
  }
};
