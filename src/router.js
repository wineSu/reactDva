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
    models: () => [import('./models/login')],
    component: () => import(/* webpackChunkName: "Login" */'./routes/Login')
  });
  const Layout = dynamic({
    app,
    models: () => [import('./models/nav')],
    component: () => import(/* webpackChunkName: "Layout" */'./layout/nav')
  });
  const IndexPage = dynamic({
    app,
    component: () => import(/* webpackChunkName: "IndexPage" */'./routes/IndexPage')
  });
  const List = dynamic({
    app,
    models: () => [import('./models/list')],
    component: () => import(/* webpackChunkName: "List" */'./routes/list')
  });
  const Ai = dynamic({
    app,
    models: () => [import('./models/list'), import('./models/ai')],
    component: () => import(/* webpackChunkName: "Ai" */'./routes/ai')
  });
  const Nnknown = dynamic({
    app,
    models: () => [import('./models/unknow')],
    component: () => import(/* webpackChunkName: "Nnknown" */'./routes/unknown')
  });
  const Known = dynamic({
    app,
    models: () => [import('./models/know')],
    component: () => import(/* webpackChunkName: "Known" */'./routes/know')
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

