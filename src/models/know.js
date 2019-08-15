import {postServer, apiUrl} from '../services/api'
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'know',
    state:fromJS({}),
    effects:{
        *getList({payload},{call,put}){
            if(!payload || !payload.p){
                payload = {
                    p: 1,
                    size: 20,
                    ivrviewid: '',
                    contexttypeid: '',
                }
            }
            const res = yield call(postServer, apiUrl.taglibList, payload)
            yield put({
                type:"initData",
                total: (res && res.count) || 0,
                data: (res && res.data) || [],
                pageState: payload
            })
        },
        *getSelList({},{call,put}){
            const sel = yield call(postServer, apiUrl.unknownSel)
            yield put({
                type:"initData",
                sel
            })
        },
        *creatCustomer({payload, callback}, {call, put}){
            let res
            if(!payload.id){
                res = yield call(postServer, apiUrl.addKnowledge, payload)
            }else{
                res = yield call(postServer, apiUrl.editKnow, payload)
            }
            if(res){
                yield put({type:"getList"})
                !!callback && callback()
            }
        },
        *delete({payload}, {call, put}){
            yield call(postServer, apiUrl.deleteTargetList, payload)
            yield put({type:"getList"})
        }
    },
    reducers: {
        //初始信息
        initData(state,data){
            return state.merge(fromJS(data))
        }
    }
};