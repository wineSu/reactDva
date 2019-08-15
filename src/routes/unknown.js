import {Component} from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import { getIn, toJS, is } from 'immutable'

const { Column } = Table;

@connect(({unknow}) => ({
  tablelist: unknow.getIn(['data']),
  total: unknow.getIn(['total']),
  pageState: unknow.getIn(['pageState'])
}))
export default class UnknownTable extends Component {
  
  //分页切换
  changePage(p, size){
    this.getList({ size, p })
  }
  
  componentDidMount(){
    //记录本次页面  再次进入复现
    const { pageState } = this.props
    if(pageState){
      return false
    }
    //初始请求列表
    this.getList()
  }

  getList(arg={}){
    this.props.dispatch({
      type: 'unknow/getList',
      payload:arg
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    //属性获取前后、状态是否变换、删除弹框是否变化 
    return !is(nextProps.tablelist, this.props.tablelist) 
  }

  render() {
    let {total, pageState, tablelist} = this.props
    //初次获取不渲染
    if(!tablelist){
        return '';
    }
    pageState = pageState.toJS()
    tablelist = tablelist.toJS()
    console.log('未识别列表渲染...')
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
      <div className="tableCont">
        <Table dataSource={tablelist} 
                pagination={paginationProps} 
                rowKey={data=>data.id}>
            <Column title="iveviewid" dataIndex="ivrviewid" />
            <Column title="ivrname" dataIndex="ivrname" />
            <Column title="nodeid" dataIndex="nodeid" />
            <Column title="formphone" dataIndex="fromphonenum"/>
            <Column title="tophone" dataIndex="tophonenum"/>
            <Column title="content" dataIndex="norecognizecontent"/>
            <Column title="time" dataIndex="ctime"/>
        </Table>
      </div>
    );
  }
}
