import {postServer, apiUrl} from '../services/api'
import { fromJS, merge } from 'immutable'

export default {
    namespace: 'list',
    state:fromJS({}),
    effects:{
        *getList({payload},{call,put}){
            if(!payload || !payload.p){
                payload = {
                    p: 1,
                    size: 20,
                    industryid: '',
                    value: '',
                    column: 'campnyname'
                }
            }
            const res = yield call(postServer, apiUrl.listData, payload)
            yield put({
                type:"initData",
                total: (res && res.count) || 0,
                data: (res && res.data) || [],
                pageState: payload
            })
        },
        *getSelList({},{call,put}){
            const sel = yield call(postServer, apiUrl.listSelData)
            yield put({
                type:"initData",
                sel
            })
        },
        *creatCustomer({payload, callback}, {call, put}){
            let res
            if(!payload.uid){
                res = yield call(postServer, apiUrl.creatCustomer, payload)
            }else{
                res = yield call(postServer, apiUrl.editCustomer, payload)
            }
            if(res){
                yield put({type:"getList"})
                !!callback && callback()
            }
        },
        *editstatus({payload}, {call, put}){
            yield call(postServer, apiUrl.editstatus, payload)
            yield put({
                type:"changeDate",
                payload
            })
        },
        *deleteCustomerList({payload}, {call, put}){
            yield call(postServer, apiUrl.deleteCustomerList, payload)
            yield put({type:"getList"})
        }
    },
    reducers: {
        //初始信息
        initData(state,data){
            return state.merge(fromJS(data))
        },
        //修改列表状态
        changeDate(state,data){
            const { status, index } = data.payload
            return state.updateIn(['data', index], item=>item.set('status', status))
        },
    }
};