var webpack = require('webpack');

const config = {
  entry: "./index.js",
  output: { filename: "bundle.js" },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
	  {  test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'env', 'stage-0'], plugins: ['transform-decorators-legacy', 'transform-class-properties'] }  },
	  {  test: /\.(jpg|png|svg)$/, loader: "url-loader", query: { mimetype: "image/png" } },
      {  test: /\.css$/, loader: "style-loader!css-loader" },
      {  test: /\.(ttf|otf|eot|svg|woff)$/, loader: 'file-loader?name=[name].[ext]' } 
    ]
  },
  plugins: [
	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
	new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;