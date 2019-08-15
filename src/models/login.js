import { routerRedux } from 'dva/router';
import {postServer, apiUrl} from '../services/api';
import { message } from 'antd';
import {setLoginToken} from '../utils/utils';

export default {
    namespace: 'login',
    state: [],
    effects:{
        *doLogin({payload:loginData},{call,put}){
            const {phonenumber, password} = loginData
            if(!phonenumber){
                message.error('用户名不能为空！')
                return false
            }
            if(!password){
                message.error('密码不能为空！')
                return false
            }
            try{
                const loginResult = yield call(postServer, apiUrl.loginsave, loginData);
                //登录成功设置存储记录
                setLoginToken(loginResult.userinfo.name);
                //记录用户信息
                yield put(routerRedux.push("/index"));
            }catch (e){
                message.error(e.message)
            }
        },
    },
    reducers: {
        
    }
};