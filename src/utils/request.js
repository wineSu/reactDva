import queryString from 'query-string'
import Loading from '../components/Loading'
import { message } from 'antd'
console.log(process.env.NODE_ENV)
const BASEURL = process.env.NODE_ENV == 'development' ? '' : 'https://yihooadmin.qingguo.com'
//将json对象拼接成 key=val&key=val 的字符串形式
function obj2params(obj) {
	var result = '';
	var item;
	for(item in obj){
		result += '&' + item + '=' +encodeURIComponent(obj[item]);
	}

	if(result) {
		result = result.slice(1);
	}
	return result;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
function parseJSON(response) {
    return response.json()
}
function get(url, params) {
    if (params) {
        url += `?${queryString.stringify(params)}`
    }
    try {
        let headers = new Headers();
        let Access_Token = 'test';
        if (Access_Token) {
            // headers.append('Access_Token', Access_Token);
        }
        Loading.show()
        return fetch(BASEURL+url, {
            headers: headers,
            credentials: "include"
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(res=>{
                Loading.hide()
                if(res.code === 10000){
                    return (res.count ? res : res.data || true)
                }else{
                    message.error(res.desc || '操作失败')
                }
            })
    } catch (e) {
        throw new Error('get error')
    }

}

function post(url, body) {
    let fetchOptions = {
        method: 'POST',
        credentials : 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(body)
    }
    //loading
    Loading.show()
    return fetch(BASEURL+url, fetchOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(res=>{
            Loading.hide()
            if(res.code === 10000){
                return (res.count ? res : res.data || true)
            }else{
                message.error(res.desc || '操作失败')
            }
        })
}

export {
    get,
    post
}