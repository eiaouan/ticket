/* eslint-disable */
module.exports = {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-typescript",
        {
          allExtensions: true, //支持所有文件扩展名
        },
      ],
    ],
    // "plugins": [
    //   ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
    // ]
  };
/* eslint-disable */