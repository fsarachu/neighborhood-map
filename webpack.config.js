const path = require('path');

module.exports = {
  entry: './app/scripts/main.js',
  output: {
    path: path.resolve(__dirname, '.tmp/scripts'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: path.resolve(__dirname, 'app/scripts'),
        loader: 'babel-loader'
      }
    ]
  }
};
