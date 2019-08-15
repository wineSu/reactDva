import {Component} from 'react'
import { connect } from 'dva'
import { Table, Switch, Icon } from 'antd'
import { getIn, toJS, is } from 'immutable'

const { Column } = Table;

@connect(({ai}) => ({
  tablelist: ai.getIn(['data']),
  total: ai.getIn(['total']),
}))
export class AiTables extends Component {
  
  //编辑 给父组件执行
  edit = (data) => () => {
    this.props.edit(data)
  }

  //编辑 意向结果
  resEdit = (data) => () => {
    this.props.resEdit(data)
  }

  switchChange = (uid, index) => (val) => {
    const flag = val ? '1' : '0'
    this.props.dispatch({
      type: "ai/editstatus",
      payload:{
        uid,
        index,
        status: flag
      }
    })
  }

  //分页切换
  changePage(p, size){
    this.props.getList({ size, p })
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
    console.log('ai--子列表渲染...')
    //分页
    const paginationProps = {
      showTotal: () => `共${total}条`,
      current: pageState.p,
      pageSize: pageState.size,
      total,
      showSizeChanger: true,
      onShowSizeChange: (current,pageSize) => this.changePage(current, pageSize),
      onChange: (current, pageSize) => this.changePage(current,pageSize)
    }
    return (
      <div>
        <Table dataSource={tablelist} 
                pagination={paginationProps} 
                rowKey={data=>data.spzc_scene_id}>
            <Column title="场景名称" dataIndex="project_name" />
            <Column title="行业" dataIndex="industryname"/>
            <Column title="场景描述" dataIndex="project_desc"/>
            <Column title="添加时间" dataIndex="add_time"/>
            <Column title="状态" dataIndex="run_status_name"
                render={(rowdata, data, index) => (
                    <div className={data.run_status === '0' ? "red" : "green"}>
                        {data.run_status === '0' ? '停止运行' : '运行中'}
                    </div>
                )}
            />
            <Column title="意向结果" dataIndex="project_ivrid"
                render={(rowdata) => (
                    <div className="editIntent">
                        <p>A:强烈意向</p>
                        <p>B:有意向</p>
                        <p>C:需筛选</p>
                        <p>D:无意向</p>
                        <p>E:需要再次跟进</p>
                        <p>F:需要重新发起或放弃</p>
                        <Icon type="edit" onClick={this.resEdit(rowdata)} className="edit" theme="twoTone"/>
                    </div>
                )}
            />
            <Column title="操作"
                    render={(rowdata, data, index) => (
                    <div>
                        <span className="a_hover" onClick={this.edit(rowdata)} >编辑</span>
                        <Switch size="small" defaultChecked={rowdata.run_status === '0' ? false : true} onChange={this.switchChange(rowdata.uid, index)}/>
                    </div>
                    )}
            />
        </Table>
      </div>
    );
  }
}
