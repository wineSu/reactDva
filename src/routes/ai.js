import {PureComponent} from 'react'
import { connect } from 'dva'
import { Input, Button } from 'antd'
import { getIn, toJS, is } from 'immutable'
import { ListSel } from './ListChild/ListSel'
import { AiTables } from './AiChild/AiTables'
import { EditFormModal } from './AiChild/AiModel'
import { EditResFormModal } from './AiChild/ResModel'

const { Search } = Input;

@connect(({ai}) => ({
  pageState: ai.getIn(['pageState'])
}))
export default class Ai extends PureComponent {
  state = {
    visible: false,
    resVisible: false
  }
  //行业选择
  onSelChange = (value) => {
    this.listProps.getList({
      p:1,
      industryid: value
    })
  }
  //确认
  handleOk = payload => {
    console.log(payload)
    this.handleCancel()
  }
  //取消
  handleCancel = () => {
    this.setState({
      visible: false,
      resVisible: false,
      editdata:{},
      resEditdata:{}
    });
  }
  //子组件需要的方法
  get listProps(){
    const { dispatch, pageState } = this.props
    return {
      getList: (arg={}) => {
        let newpage = pageState ? pageState.toJS() : {}
        dispatch({
          type: 'ai/getList',
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
      resEdit: (resEditdata) => {
        this.setState({
          resVisible: true,
          resEditdata
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
    console.log('ai列表渲染...')
    return (
      <div>
          <div className="searchCont clearx">
            <div className="left">
              <label>行业</label>
              <ListSel onchange={this.onSelChange} initState={pageState.industryid}/>
            </div> 
          </div>
          <div className="tableCont">
            <Button type="primary" icon="undo">
              同步 spcc
            </Button>
            <AiTables {...this.listProps}/>
          </div>
          {
            this.state.visible ? <EditFormModal
                                    visible={this.state.visible}
                                    editdata={this.state.editdata}
                                    onOk={(values) => this.handleOk(values)}
                                    onCancel={this.handleCancel}
                                  /> : ''
          }
          {
            this.state.resVisible ? <EditResFormModal
                                    visible={this.state.resVisible}
                                    editdata={this.state.resEditdata}
                                    onOk={(values) => this.handleOk(values)}
                                    onCancel={this.handleCancel}
                                  /> : ''
          }
      </div>
    );
  }
}
