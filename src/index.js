import dva from 'dva';
import './assets/common.less';
// 1. Initialize
const app = dva({
    
});

// 2. Plugins
// app.use();

// 3. Model
// app.model(require('./models/nav').default);
//配置了按需引入  这种全部引入的方式废弃
// require('./models').default.map(key => app.model(key.default))

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
