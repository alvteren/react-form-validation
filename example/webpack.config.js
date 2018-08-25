const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './example/source/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      're-validate': path.resolve(__dirname, '../source')
    }
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()]
};
