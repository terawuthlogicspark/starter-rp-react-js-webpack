const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const package = require("./package.json");
const commonPaths = require("./utils/config/commonPaths");

const isDebug = !process.argv.includes("release");

const port = process.env.PORT || 5173;

module.exports = {
  entry: commonPaths.entryPath,
  output: {
    uniqueName: package.name,
    publicPath: "/",
    path: commonPaths.outputPath,
    filename: `${package.version}/js/[name].[chunkhash:8].js`,
    chunkFilename: `${package.version}/js/[name].[chunkhash:8].js`,
    assetModuleFilename: isDebug
      ? `images/[path][name].[contenthash:8][ext]`
      : `images/[path][contenthash:8][ext]`,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs',
          to: 'pdf.worker.min.mjs'
        }
      ]
    })
  ],
  devServer: {
    port: port,
    static: {
      directory: commonPaths.outputPath,
    },
    historyApiFallback: {
      index: "index.html",
    },
    webSocketServer: false,
  },
   module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};