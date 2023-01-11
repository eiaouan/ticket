/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  output: {
    publicPath: "/",
    filename: "[name].js", //输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, "./dist"), //指定生成的文件目录
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".vue", "..."],
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
      title: "高铁车票管理系统",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
  target: "web",
  devServer: {
    // contentBase: path.join(__dirname, "src/html"),
    hot: true, // 热跟新
    open: true,
    port: 3456,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://8.134.208.193:8500",
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
