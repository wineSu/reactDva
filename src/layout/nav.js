import {PureComponent} from 'react'
import { connect } from 'dva'
import {Link} from "dva/router"
import {getLoginToken} from '../utils/utils'
import Bar from '../components/Bar'
import { Layout, Menu, Icon, Modal } from 'antd'

const { Footer, Sider, Content } = Layout

@connect(({nav} ) => ({
    menuData:nav.menuData
}))
export default class Nav extends PureComponent {
    state = {
        nameuser: getLoginToken(),
        modalVisible: false
    }

    //退出提示确认
    onOk = () => {
        this.props.dispatch({
            type:"nav/doLogout"
        })
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    
    loginout = ()=>{
        this.setState({
            modalVisible: true
        })
    }

    componentDidMount(){
        //获取菜单
        const {dispatch} = this.props;
        dispatch({
            type:"nav/doGetMenu"
        })
    }

    /**
     * 展示菜单
     */
    showMenu(data){
        if(typeof(data) === "undefined"){
            return [];
        }else{
            return data.map((item) => {
                //重复点击当前导航
                if(this.props.location.pathname === item.url){
                    return (
                        <Menu.Item key={item.url}>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </Menu.Item>
                    ) 
                }
                return (
                    <Menu.Item key={item.url}>
                        <Link to={item.url} replace>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            });
        }
    }

    render() {
        const {menuData} = this.props;
        //初次获取菜单不渲染
        if(!menuData){
            return '';
        }
        console.log('导航组件渲染....')
        return (
            <Layout style={{ minHeight: '100vh',height: '100%' }}>
                <Sider width={240} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src="https://jicvps.qingguo.com/AntUser/dist/img/logo.png" alt="蚁呼"/>
                    </div>
                    <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
                        {this.showMenu(menuData)}
                    </Menu>
                </Sider>
                <Layout>
                    <div className="header clearx">
                        <div className="left">
                            <span className="sys_name">智能外呼系统</span>
                            <span className="sys_version">超管版</span>
                        </div>
                        <div className="right rightHandle">
                            <span className="question left"></span>
                            <span className="left line" style={{marginLeft:"24px"}}>|</span>
                            <div className="left managePeo">
                            <span>管理员：</span>
                            <span>{this.state.nameuser}</span>
                            </div>
                            <div className="left news">
                            <em>3</em>
                            </div>
                            <span className="left line" style={{margin: "0 18px"}}>|</span>
                            <span className="out left" onClick={this.loginout}></span>
                        </div>
                    </div>
                    <Content style={{ margin: '0 16px' }}>
                        {/*面包屑*/}
                        <Bar/>
                        <div>{this.props.children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Design ©2018 Created by SZ</Footer>
                </Layout>
                {
                    this.state.modalVisible ?<Modal
                                        title="提示"
                                        centered
                                        width="300px"
                                        visible={this.state.modalVisible}
                                        onOk={this.onOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <p>确定退出吗？</p>
                                    </Modal> : ''
                }
            </Layout>
        );
    }
}
