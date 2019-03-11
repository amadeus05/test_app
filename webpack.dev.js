const merge = require('webpack-merge');
const common = require('./webpack.common.js');
/**
 * @see {@link https://stackoverflow.com/questions/41294738/set-the-url-automatically-opened-in-browser-with-webpack-dev-server-in-webpack2 StackOverflow}
 */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// process.traceDeprecation  = true;//activate to trace plugin deprecations

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
  ]
});
