module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: /src/,
        loader: "babel",
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["transform-decorators-legacy"],
        }
      }
    ]
  },
  devtool: "inline-source-map",
  externals: {
    "BreathingHalftone": "BreathingHalftone"
  }
};
