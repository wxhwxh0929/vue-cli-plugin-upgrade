module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "after-used",
      },
    ], // 不能有声明后未被使用的变量或参数
    semi: [2, "always"], // 语句强制分号结尾
    quotes: [1, "single"], // 建议使用单引号
    "no-redeclare": [
      2,
      {
        builtinGlobals: true,
      },
    ], // 不允许重复声明
  },
};
