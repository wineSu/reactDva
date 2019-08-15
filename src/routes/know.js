import {PureComponent} from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { getIn, toJS } from 'immutable'
import { CreateCustomFormModal } from './KnowChild/KnowModel'
import { ListTable } from './KnowChild/KnowTable'
import { Sel } from './KnowChild/sel'

@connect(({know}) => ({
  pageState: know.getIn(['pageState']),
  selState: know.getIn(['sel'])
}))
export default class Know extends PureComponent {
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
      type: "know/creatCustomer",
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

  //视图 或 语境   选择
  onSelChange = (key) => (value) => {
    this.listProps.getList({
      p:1,
      [key]: value
    })
  }
  
  //子组件需要的方法
  get listProps(){
    const { dispatch, pageState } = this.props
    return {
      getList: (arg={}) => {
        let newpage = pageState ? pageState.toJS() : {}
        dispatch({
          type: 'know/getList',
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
      getSel: () => {
          dispatch({
              type: 'know/getSelList'
          })
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
    this.listProps.getSel()
  }

  render() {
    let { pageState, selState } = this.props
    if(!selState || !pageState){
      return false
    }
    pageState = pageState.toJS()
    selState = selState.toJS()
    console.log('知识库列表渲染...')
    return (
      <div>
          <div className="searchCont clearx">
            <div className="left">
              <label>视图名称</label>
              <Sel onchange={this.onSelChange('ivrviewid')} initState={selState.iview} defaultState={pageState.ivrviewid}/>
            </div>
            <div className="left" style={{marginLeft: 30}}>
              <label>语境分类</label>
              <Sel onchange={this.onSelChange('contexttypeid')} initState={selState.type} defaultState={pageState.contexttypeid}/>
            </div>
          </div>
          <div className="tableCont">
            <Button type="primary" icon="user-add" onClick={this.showModal}>
              新增词库
            </Button>
            <ListTable {...this.listProps}/>
          </div>
          {
            this.state.visible ? <CreateCustomFormModal
                                    visible={this.state.visible}
                                    selData = {selState}
                                    editdata={this.state.editdata}
                                    onOk={(values) => this.handleOk(values)}
                                    onCancel={this.handleCancel}
                                  /> : ''
          }
      </div>
    );
  }
}
