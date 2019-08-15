import {postServer, apiUrl} from '../services/api'
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'ai',
    state:fromJS({}),
    effects:{
        *getList({payload},{call,put}){
            if(!payload || !payload.p){
                payload = {
                    p: 1,
                    size: 20,
                    industryid: ''
                }
            }
            const res = yield call(postServer, apiUrl.sceneList, payload)
            yield put({
                type:"initData",
                total: (res && res.count) || 0,
                data: (res && res.data) || [],
                pageState: payload
            })
        },
        *editstatus({payload}, {put}){
            yield put({
                type:"changeDate",
                payload
            })
        },
    },
    reducers: {
        //初始信息
        initData(state,data){
            return state.merge(fromJS(data))
        },
        //修改列表状态
        changeDate(state,data){
            const { status, index } = data.payload
            return state.updateIn(['data', index], item=>item.set('run_status', status))
        },
    }
};