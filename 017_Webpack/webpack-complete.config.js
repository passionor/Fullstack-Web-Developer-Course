const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/js/1.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
      { test: /\.(jpg|png|gif)$/i, use: {
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          limit: 8*1024
        }
      }},
      { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
      { 
        test: /\.jsx?/i, 
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};