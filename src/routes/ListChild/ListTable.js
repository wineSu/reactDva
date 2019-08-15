import {Component} from 'react'
import { connect } from 'dva'
import { Table, Switch, Modal } from 'antd'
import { getIn, toJS, is } from 'immutable'

const { Column } = Table;

@connect(({list}) => ({
  tablelist: list.getIn(['data']),
  total: list.getIn(['total']),
}))
export class ListTable extends Component {
  state={
    modalVisible: false
  }
  //switch切换
  switchChange = (uid, index) => (val) => {
    const flag = val ? '0' : '1'
    this.props.dispatch({
      type: "list/editstatus",
      payload:{
        uid,
        index,
        status: flag
      }
    })
  }

  //编辑 给父组件执行
  edit = (data) => () => {
    this.props.edit(data)
  }
  //删除
  del = (uid) => () => {
    this.setState({
      modalVisible: true,
      uid
    })
  }

  //删除提示确认
  onOk = () => {
    this.props.dispatch({
      type: "list/deleteCustomerList",
      payload:{
        uid: this.state.uid
      }
    })
    this.handleCancel()
  }
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  //分页切换
  changePage(p, size){
    this.props.getList({ size, p })
  }
 
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { tablelist } = nextProps;
  //   // 当tablelist发生变化的时候，更新state
  //   if (!is(tablelist, prevState.prevtablelist)) {
  //       return{
  //         tablelist,
  //         prevtablelist: tablelist //缓存上次的props
  //       }
  //   }
  //   // 否则，对于state不进行任何操作
  //   return null;
  // }

  shouldComponentUpdate(nextProps, nextState){
    //属性获取前后、状态是否变换、删除弹框是否变化 
    return !is(nextProps.tablelist, this.props.tablelist) 
            || !is(nextState.tablelist, this.state.tablelist) 
            || nextState.modalVisible !== this.state.modalVisible
  }

  render() {
    let {total, pageState, tablelist} = this.props
    // let { tablelist } = this.state
    //初次获取不渲染
    if(!tablelist){
        return '';
    }
    pageState = pageState.toJS()
    tablelist = tablelist.toJS()
    console.log('列表--子列表渲染...')
    //分页
    const paginationProps = {
      showTotal: () => `共${total}条`,
      current: pageState.p,
      pageSize: pageState.size,
      total,
      showSizeChanger: true,
      onShowSizeChange: (current,pageSize) => this.changePage(current, pageSize),
      onChange: (current, pageSize) => this.changePage(current, pageSize),
    }
    return (
      <div>
        <Table dataSource={tablelist} 
                pagination={paginationProps} 
                rowKey={data=>data.uid}>
            <Column title="代理公司名称" dataIndex="campnyname" />
            <Column title="地区" dataIndex="provincename" />
            <Column title="行业" dataIndex="industryname" />
            <Column title="管理员姓名" dataIndex="username"/>
            <Column title="登录账号" dataIndex="contact_phone"/> 
            <Column title="场景"
                    dataIndex="scenes"
                    render={scenes => (
                    <span>
                        {scenes.map((tag,index) => (
                        <p key={index}>
                            {tag}
                        </p>
                        ))}
                    </span>
                    )}
            />
            <Column title="过期时间" dataIndex="expire_time"/>
            <Column title="线路网关"
                    dataIndex="callerphones"
                    key="callerphones"
                    render={callerphones => (
                    <span>
                        {callerphones.map((tag,index) => (
                        <p key={index}>
                            {tag}
                        </p>
                        ))}
                    </span>
                    )}
            />
            <Column title="操作"
                    width="260px"
                    render={(rowdata, data, index) => (
                    <div>
                        <span className="a_hover" onClick={this.edit(rowdata)}>编辑</span>
                        <span className="a_hover">重置密码</span>
                        {rowdata.status === '1' ? <span className="a_hover" onClick={this.del(rowdata.uid)}>删除</span> : ""}
                        <Switch size="small" defaultChecked={rowdata.status === '1' ? false : true} onChange={this.switchChange(rowdata.uid, index)} />
                    </div>
                    )}
            />
        </Table>
        {
          this.state.modalVisible ?<Modal
                                title="提示"
                                centered
                                width="300px"
                                visible={this.state.modalVisible}
                                onOk={this.onOk}
                                onCancel={this.handleCancel}
                              >
                                <p>删除后不可恢复，确认删除？</p>
                              </Modal> : ''
        }
      </div>
    );
  }
}
