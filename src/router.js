import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from "dva/dynamic";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
/**
 * 是否登陆判断
 */
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
      {...rest}
      exact
      render={props =>
          Boolean(localStorage['loginUserToken']) ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                      pathname: "/login"
                  }}
              />
          )
      }
  />
);

function RouterConfig({ history, app }) {
  const Login = dynamic({
    app,
    models: () => [import('./models/login')],  //动态引入model，可以引入多个model
    component: () => import('./routes/Login')  //动态引入组件
  });
  const Layout = dynamic({
    app,
    models: () => [import('./models/nav')],  //动态引入model，可以引入多个model
    component: () => import('./layout/nav')  //动态引入组件
  });
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')  //动态引入组件
  });
  const List = dynamic({
    app,
    models: () => [import('./models/list')],  //动态引入model，可以引入多个model
    component: () => import('./routes/list')  //动态引入组件
  });
  const Ai = dynamic({
    app,
    models: () => [import('./models/list'), import('./models/ai')],  //动态引入model，可以引入多个model
    component: () => import('./routes/ai')  //动态引入组件
  });
  const Nnknown = dynamic({
    app,
    models: () => [import('./models/unknow')],  //动态引入model，可以引入多个model
    component: () => import('./routes/unknown')  //动态引入组件
  });
  const Known = dynamic({
    app,
    models: () => [import('./models/know')],  //动态引入model，可以引入多个model
    component: () => import('./routes/know')  //动态引入组件
  });
  
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect from="/" exact to="/index"/>
          <Layout>
            <PrivateRoute path="/index" component={IndexPage} />
            <PrivateRoute path="/list" component={List} />
            <PrivateRoute path="/ai" component={Ai} />
            <PrivateRoute path="/know" component={Known} />
            <PrivateRoute path="/unknown" component={Nnknown} />
          </Layout>
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;

