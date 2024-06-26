const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: {
      app: {
        name: 'chrome',
      },
    },
    compress: true,
    port: 9090,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
