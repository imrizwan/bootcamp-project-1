const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')
var ManifestPlugin = require('webpack-manifest-plugin');

//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

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
    //new ManifestPlugin({
    //  fileName: 'asset-manifest.json', // Not to confuse with manifest.json 
    //}),
    // new SWPrecacheWebpackPlugin({
    //   // By default, a cache-busting query parameter is appended to requests
    //   // used to populate the caches, to ensure the responses are fresh.
    //   // If a URL is already hashed by Webpack, then there is no concern
    //   // about it being stale, and the cache-busting can be skipped.
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   logger(message) {
    //     if (message.indexOf('Total precache size is') === 0) {
    //       // This message occurs for every build and is a bit too noisy.
    //       return;
    //     }
    //     console.log(message);
    //   },
    //   minify: true, // minify and uglify the script
    //   navigateFallback: '/index.html',
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    // }),
    new WebpackPwaManifest({
      name: 'OLX Progressive Web App',
      short_name: 'OLX',
      description: 'My First Progressive Web App!',
      display: "fullscreen",
      start_url: "/",
      orientation: "portrait-primary",
      background_color: "#fff",
      theme_color: "#3f51b5",
      gcm_sender_id: "103953800507",
      icons: [
        {
          src: path.resolve('src/client/icon.png'),
          size: '144x144' // you can also use the specifications pattern
        }
      ]
    })
  ]
};
