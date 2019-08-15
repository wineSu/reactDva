import {PureComponent} from 'react'
import { connect } from 'dva'
import { Input, Button } from 'antd'
import { getIn, toJS } from 'immutable'
import { CreateCustomFormModal } from './ListChild/ListModal'
import { ListTable } from './ListChild/ListTable'
import { ListSel } from './ListChild/ListSel'

const { Search } = Input;

@connect(({list}) => ({
  pageState: list.getIn(['pageState'])
}))
export default class List extends PureComponent {
  state = { 
    visible: false,
    editdata:{}
  };
  //弹框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  //确认
  handleOk = payload => {
    this.props.dispatch({
      type: "list/creatCustomer",
      payload,
      callback: (res)=>{
        this.handleCancel()
      }
    })
  }
  //取消
  handleCancel = () => {
    this.setState({
      visible: false,
      editdata:{}
    });
  }

  //输入搜索
  onSearch = (value) => {
    this.listProps.getList({
      value
    })
  }

  //行业选择
  onSelChange = (value) => {
    this.listProps.getList({
      p:1,
      industryid: value
    })
  }
  
  //子组件需要的方法
  get listProps(){
    const { dispatch, pageState } = this.props
    return {
      getList: (arg={}) => {
        let newpage = pageState ? pageState.toJS() : {}
        dispatch({
          type: 'list/getList',
          payload:{
            ...newpage,
            ...arg
          }
        })
      },
      edit: (editdata) => {
        this.setState({
          visible: true,
          editdata
        });
      },
      pageState
    }
  }
  
  componentDidMount(){
    //记录本次页面  再次进入复现
    const { pageState } = this.props
    if(pageState){
      return false
    }
    //初始请求列表
    this.listProps.getList()
  }

  render() {
    let { pageState } = this.props
    if(!pageState){
      return false
    }
    pageState = pageState.toJS()
    console.log('列表渲染...')
    return (
      <div>
          <div className="searchCont clearx">
            <div className="left">
              <label>行业</label>
              <ListSel onchange={this.onSelChange} initState={pageState.industryid}/>
            </div> 
            <Search className="right" defaultValue={pageState.value} style={{ width: 300 }} placeholder="请输入公司名称" onSearch={this.onSearch} enterButton />
          </div>
          <div className="tableCont">
            <Button type="primary" icon="user-add" onClick={this.showModal}>
              新增客户
            </Button>
            <ListTable {...this.listProps}/>
          </div>
          {
            this.state.visible ? <CreateCustomFormModal
                                    visible={this.state.visible}
                                    editdata={this.state.editdata}
                                    onOk={(values) => this.handleOk(values)}
                                    onCancel={this.handleCancel}
                                  /> : ''
          }
      </div>
    );
  }
}
