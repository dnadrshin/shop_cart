
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3030'
  ],
  output: {
    path: path.join(__dirname, '')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      include: path.join(__dirname, 'src')
    }]
  }
};
