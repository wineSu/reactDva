import React from 'react'
import { connect } from 'dva'
import { formCreate } from '../components/formCreat'
import { Checkbox } from 'antd'

@connect()
//自定义from
@formCreate
class Login extends React.Component {
    
    //登录
    handleSubmit=()=>{
        const {dispatch, getVal} = this.props;
        dispatch({
            type: 'login/doLogin',
            payload: {
              ...getVal(),
              expire: 1
            },
        });
	}
    render(){
        console.log('登录组件')
        return (
            <div>
                <div className="loginHeader wrapWidth clearx">
                    <img src='https://jicvps.qingguo.com/AntUser/dist/img/login_logo.png' alt="" className="left" />
                    <div className="right">
                        <ul className="left clearx">
                            <li><a href="https://www.qingguo.com/yihoo.php">首页</a></li>
                            <li><a href="https://www.qingguo.com/yihoo.php">蚁呼介绍</a></li>
                            <li><a href="https://www.qingguo.com/yihoo/about.php">关于我们</a></li>
                        </ul>
                        <a className="btn left">申请合作</a>
                    </div>
                </div>
                <div className="loginCont">
                    <div className="wrapWidth clearx">
                        <div className="box right">
                            <p className="title">账户登录</p>
                            <div className="inputCont">
                                <div className="input">
                                    <input type="text" {...this.props.setval('phonenumber')} placeholder="用户名" id="username"/>
                                    <em className="clearText cur"></em>
                                </div>
                            </div>
                            <div className="inputCont">
                                <div className="input">
                                    <input type="password" placeholder="密码" {...this.props.setval('password')} />
                                    <em className="isshow"></em>
                                </div>
                            </div>
                            <div className="remember clearx">
                                <Checkbox>记住密码</Checkbox>
                                <a href="/user/findpassword.php" className="right">忘记密码？</a>
                            </div>
                            <p className="tip"></p>
                            <a className="loginBtn self_btn" onClick={this.handleSubmit}>立即登录</a>
                        </div>
                    </div>			
                </div>
                <div className="copyright text_c">
                    <p>版权所有 北京青果时代教育科技有限公司 Copyright©2013-2018</p>
                    <p>京ICP证京B2-20171776号&nbsp;京ICP备15042696号-1 京公网安备11010802010411号</p>
                </div>
            </div>
          );
    }
}
export default Login 