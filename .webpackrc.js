let path = require('path')

const config = {
  es5ImcompatibleVersions: true,
  entry: {
    index:'./src/index.js',
    vendor:[
      'dva',
      'react',
      'react-dom',
      'immutable',
      'antd/lib/button',
      'antd/lib/icon',
      'antd/lib/table',
      'antd/lib/date-picker',
      'antd/lib/form',
      'antd/lib/modal',
      'antd/lib/grid',
      'antd/lib/input',
      'antd/lib/select',
    ]
  },
  commons:[{
    name: 'vendor',
    filename: '[name].[hash].js'
  }],
  hash: true,
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  html:{
    "template": "./src/index.ejs"
  },
  disableCSSModules:true,
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"]
    }
  },
  proxy: {
    "/": {
      target: "https://yihooadmin.qingguo.com",
      pathRewrite: {
        "^/column" : "/column"
      },
      changeOrigin: true,
      //携带cookie
      cookieDomainRewrite: "localhost"
    }
  }
}
export default config