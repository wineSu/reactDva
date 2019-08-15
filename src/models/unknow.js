import {postServer, apiUrl} from '../services/api'
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'unknow',
    state:fromJS({}),
    effects:{
        *getList({payload},{call,put}){
            if(!payload || !payload.p){
                payload = {
                    p: 1,
                    size: 20
                }
            }
            const res = yield call(postServer, apiUrl.unknownList, payload)
            yield put({
                type:"initData",
                total: (res && res.count) || 0,
                data: (res && res.data) || [],
                pageState: payload
            })
        },
    },
    reducers: {
        //初始信息
        initData(state,data){
            return state.merge(fromJS(data))
        }
    }
};