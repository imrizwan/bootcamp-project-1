const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')

const outputDirectory = "dist";

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/client/sw.js'),
    }),
    new WebpackPwaManifest({
      name: 'OLX Progressive Web App',
      short_name: 'OLX',
      description: 'My First Progressive Web App!',
      display: "fullscreen",
      start_url: "/",
      orientation: "portrait-primary",
      background_color: "#fff",
      theme_color: "#3f51b5",
      icons: [
        {
          src: path.resolve('src/client/icon.png'),
          size: '144x144' // you can also use the specifications pattern
        }
      ]
    })
  ]
};
