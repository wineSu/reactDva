/**
 * 如果配置了按需引入 此文件无效
 */
const context = require.context('./', false, /\.js$/);
export default context
.keys()
.filter(item => item !== './index.js')
.map(key => context(key));