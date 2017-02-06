var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "public/bundle.js",
    publicPath: '/public/',
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        loader: "babel",
        exclude: [nodeModulesPath],
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["transform-decorators-legacy"],
        }
      }
    ]
  },
  devtool: "cheap-module-source-map",
  externals: {
    "BreathingHalftone": "BreathingHalftone"
  }
};
