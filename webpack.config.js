/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  output: {
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 用asset modules type 实现加载图片
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        generator: {
          filename: "images/[name]-hash][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[hash][ext]",
        },
      },
    ],
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "vue3-create",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
  target: "web",
  devServer: {
    hot: true, // 热跟新
    open: true,
    proxy: {
      "/api": {
        target: "http://",
        changeOrigin: true, // 修改请求头中的host
        secure: false, // 运行代理到https
        pathRewrite: {
          // 重写地址
          "^/api": "/",
        },
      },
    },
  },
  optimization: {
    splitChunks: {
      // 选择文件进行拆分，默认是async 只对动态导入的文件进行拆分
      chunks: "all",
      // 提取chunk的最小体积
      minSize: 20000,
      // 提取chunk的最少引用次数
      minChunks: 1,
      // 对要提取的trunk分组
      cacheGroups: {
        // 匹配node——modules中的第三方库。打包成一个tunk
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
        },
        default: {
          minChunks: 2,
          name: "default",
          priority: -20,
        },
      },
    },
  },
};
