import { getMenu } from '../services/api'
import {clearLoginToken} from '../utils/utils';
import { routerRedux } from 'dva/router';

export default {
    namespace:"nav",
    state:{
        
    },
    effects: {
        *doGetMenu(payload,{call,put}){
            const menuData = yield call(getMenu)
            yield put({
                type:"setMenuData",
                menuData
            })
        },
        *doLogout(payload,{put}){
            clearLoginToken();
            yield put(routerRedux.push("/login"));
        },
    },
    subscriptions: {
        setup ({dispatch, history}) {
            history.listen(( pathname ) => {
                //初始化一些事情
                /**
                 * 这个写在组件的componentDidMount  组件会render两次 所以 写在这里避免了should的判断
                 */
                switch(pathname.pathname){
                    case '/index':
                            dispatch({
                                type:"setBar",
                                bar:{
                                    name: "首页",
                                    nextname:"用户列表"
                                }
                            })
                        break;
                    case '/list':
                            dispatch({
                                type:"setBar",
                                bar:{
                                    name: "列表",
                                    nextname:"客户列表"
                                }
                            })
                        break;
                    case '/ai':
                            dispatch({
                                type:"setBar",
                                bar:{
                                    name: "场景AI",
                                    nextname:"AI列表"
                                }
                            })
                        break;
                    case '/know':
                        dispatch({
                            type:"setBar",
                            bar:{
                                name: "列表",
                                nextname:"知识库"
                            }
                        })
                            break;
                    case '/unknown':
                        dispatch({
                            type:"setBar",
                            bar:{
                                name: "列表",
                                nextname:"未识别列表"
                            }
                        })
                        break;
                    default:
                        break;
                }
                
            })
        }
    },
    reducers:{
        //设置菜单状态
        setMenuData(state,{menuData}){
            return {
                ...state,
                menuData:menuData
            };
        },
        //面包屑
        setBar(state,{bar}){
            return{
                ...state,
                bar
            }
        }
    }

}