#!/usr/bin/env node

let program = require("commander");
let cmdValue;
let envValue;

program
  .version(require("../package").version, "-v, --version")
  .description("A cli tool for upgrade of service-component")
  .usage("<command> [options]")
  .option("-i, --improve", "service-component upgrade begin")
  .alias("g")
  .action(function (cmd, env) {
    cmdValue = cmd;
    envValue = env;
    // console.log('执行开始')
  })
  .parse(process.argv);
// .command("generate", "A cli tool for upgrade of service-component"));

if (cmdValue.improve) {
  // console.log("improve something");
  require("../libs/init");
}
