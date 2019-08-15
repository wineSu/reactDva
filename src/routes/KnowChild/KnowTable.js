import {Component} from 'react'
import { connect } from 'dva'
import { Table, Switch, Modal } from 'antd'
import { getIn, toJS, is } from 'immutable'

const { Column } = Table;

@connect(({know}) => ({
  tablelist: know.getIn(['data']),
  total: know.getIn(['total']),
}))
export class ListTable extends Component {
  state={
    modalVisible: false
  }

  //编辑 给父组件执行
  edit = (data) => () => {
    this.props.edit(data)
  }
  //删除
  del = (id) => () => {
    this.setState({
      modalVisible: true,
      id
    })
  }

  //删除提示确认
  onOk = () => {
    this.props.dispatch({
      type: "know/delete",
      payload:{
        id: this.state.id
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
 
  shouldComponentUpdate(nextProps, nextState){
    //属性获取前后、状态是否变换、删除弹框是否变化 
    return !is(nextProps.tablelist, this.props.tablelist) 
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
                rowKey={data=>data.id}>
            <Column title="视图名称" dataIndex="ivrviewname" />
            <Column title="语境分类" dataIndex="contexttype" />
            <Column title="通话内容" dataIndex="callcontent" />
            <Column title="关键词" dataIndex="tags"/>
            <Column title="拼音" width="80px" dataIndex="contexttypename"/> 
            <Column title="音频文件"
                    dataIndex="filename"
                    render={(rowdata) => (
                    <div>
                        <audio controls controlsList="nodownload" src={'http://172.16.20.210:81/'+rowdata}/>
                    </div>
                    )}
            />
            <Column title="操作"
                    width="120px"
                    render={(rowdata, data, index) => (
                    <div>
                        <span className="a_hover" onClick={this.edit(rowdata)}>编辑</span>
                        <span className="a_hover" onClick={this.del(rowdata.id)}>删除</span>
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
