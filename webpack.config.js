const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

module.exports = function (webpackConfig, env) {
  webpackConfig.plugins.push(
    new CSSSplitWebpackPlugin({
        size: 3000
    })
  )
  return webpackConfig
}