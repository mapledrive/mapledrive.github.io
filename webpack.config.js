var webpack = require('webpack');

const config = {
  entry: "./index.js",
  output: { filename: "bundle.js" },
  devtool: 'eval',
  devServer: { stats: 'errors-only', open: true },
  module: {
    loaders: [
      {  test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'env', 'stage-0'], plugins: ['transform-decorators-legacy', 'transform-class-properties'] }  },
	  {  test: /\.(jpg|png|svg)$/, loader: "url-loader", query: { mimetype: "image/png" } },
      {  test: /\.css$/, loader: "style-loader!css-loader" },
      {  test: /\.(ttf|otf|eot|svg|woff)$/, loader: 'file-loader?name=[name].[ext]' } 
    ]
  }
};

module.exports = config;