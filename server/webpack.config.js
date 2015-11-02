module.exports = {
  entry: "public/App/app.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less?strictMath&noIeCompat"
      }
    ]
  }
};
