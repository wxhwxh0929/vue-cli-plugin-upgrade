#!/usr/bin/env node

var program = require("commander"); //实现命令行功能
const chalk = require("chalk"); //一个颜色的插件，设置终端输出的样式，可以用来指定回显的字体颜色，粗细及背景色
const ora = require("ora"); //实现node.js命令行环境的loading效果，和显示各种状态的图标等  终端小图标
const progress = require("progress"); //进度条插件
const inquirer = require("inquirer"); //一组通用的交互式命令行用户界面
const spinnerstyle = require("./spinners.json");
const path = require("path");
const fs = require("fs");
const rootDir = process.cwd(); //D:\vue-cli-plugin-upgrade
const data = require("../libs/template");

const spinner = ora({
  text: chalk.blue("service-component upgrade begin"),
  spinner: spinnerstyle.dots,
});

program.parse(process.argv);

/**
 * Upgrade
 */
(function () {
  let suffix = ".js";
  const baseDir = program.RootDir
    ? program.RootDir === true
      ? "./src"
      : `./${program.RootDir}`
    : "./src"; //./src
  const basePath = path.join(rootDir, baseDir);
  program.RootDir &&
    program.RootDir !== true &&
    !fs.existsSync(basePath) &&
    fs.mkdirSync(basePath);
  // spinner.start("Upgrade, please wait......");
  checkBasePathIsexists(basePath, baseDir);

  /**
   * checkBasePathIsexists 检查路径 src 是否存在
   * @param {*} currentPath  D:\vue-cli-plugin-upgrade\src
   * @param {*} currentDir  ./src
   */
  function checkBasePathIsexists(currentPath, currentDir) {
    if (fs.existsSync(currentPath)) {
      checkPathIsexists(".conf", "setup");
    } else {
      console.log("");
      spinner.fail(
        chalk.red(currentDir.substring(2) + " directory does not exist!")
      );
      console.log("");
    }
  }

  /**
   * checkPathIsexists 检查项目的src目录中是否存在.conf文件夹
   * @param {*} currentDir .conf
   * @param {*} filename setup
   */
  function checkPathIsexists(currentDir, filename) {
    let currentPath = path.join(basePath, currentDir);
    if (fs.existsSync(currentPath)) {
      checkFileIsexists(currentPath, filename);
    } else {
      console.log("");
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "isGenerateConfDir",
            message: `${currentDir} directory does not exist , Are you generate ${currentDir} directory?`,
          },
        ])
        .then((answers) => {
          if (answers.isGenerateConfDir) {
            console.log("");
            spinner.start(`${currentDir} directory is generating......`);
            console.log("");
            fs.mkdir(currentPath, function (err) {
              if (err) {
                console.log("");
                spinner.fail(
                  chalk.red(
                    `${currentDir} directory generated fail! and err is ${err}`
                  )
                );
                console.log("");
              } else {
                console.log("");
                spinner.succeed(
                  `${currentDir} directory generated successfully!`
                );
                checkFileIsexists(currentPath, filename);
              }
            });
          } else {
            console.log("");
            spinner.fail(
              chalk.red(
                `${currentDir} directory generated fail! service-component upgrade fail!`
              )
            );
            console.log("");
          }
        });
    }
  }
  /**
   * checkFileIsexists 检查在文件夹下是否存在setup
   * @param {*} currentPath D:\vue-cli-plugin-upgrade\src\.conf
   * @param {*} filename setup
   */
  function checkFileIsexists(currentPath, filename) {
    if (Object.prototype.toString.call(filename) === "[object Array]") {
      filename.forEach(function (onefile) {
        let file = path.join(currentPath, "./" + onefile);
        generateSetupFile(file, onefile);
      });
    } else {
      let file = path.join(currentPath, "./" + filename);
      generateSetupFile(file, filename);
    }
  }

  /**
   * generateSetupFile 生成setup.js文件
   * @param {*} file D:\vue-cli-plugin-upgrade\src\.conf\setup
   * @param {*} filename setup
   */
  function generateSetupFile(file, filename) {
    //D:\vue-cli-plugin-upgrade\src\.conf\setup
    let currentPath = file + suffix;
    let currentDir = file + suffix;
    let showFileName = filename + suffix;
    if (fs.existsSync(currentDir)) {
      console.log("");
      spinner.start(showFileName + " has exists and is appending......");
      fs.appendFileSync(currentPath, data.setUpData);
      console.log("");
      spinner.succeed(showFileName + " appended successfully!");
      console.log("");
    } else {
      console.log("");
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "isGenerateSetupFile",
            message: `${showFileName} file does not exist , Are you generate ${showFileName} file?`,
          },
        ])
        .then((answers) => {
          if (answers.isGenerateSetupFile) {
            console.log("");
            spinner.start(showFileName + " file is generating......");
            console.log("");
            fs.writeFile(currentPath, data.setUpData, function (err) {
              if (err) {
                console.log("");
                spinner.fail(
                  chalk.red(
                    `${showFileName} file generated fail! and err is ${err}`
                  )
                );
                console.log("");
              } else {
                console.log("");
                spinner.succeed(showFileName + " file generated successfully!");
                console.log("");
              }
            });
          } else {
            console.log("");
            spinner.fail(
              chalk.red(
                `${showFileName} file generated fail! service-component upgrade fail!`
              )
            );
            console.log("");
          }
        });
    }
  }
})();
