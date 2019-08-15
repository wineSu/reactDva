import {Component} from 'react'
import { connect } from 'dva'
import { Select } from 'antd'
import { getIn, toJS, is } from 'immutable'

const { Option } = Select;

//行业选择 组件
@connect(({list}) => ({
  sel: list.getIn(['sel'])
}))
export class ListSel extends Component {

  //下拉选择
  selChange = (value) => {
    const { onchange, onChange  } = this.props
    //弹框中透传给form表单
    onChange && onChange(value)
    //父组件中透传事件
    onchange && onchange(value)
  }

  componentDidMount(){
    const { sel } = this.props
    //行业选择列表
    if(!sel){
      this.props.dispatch({
        type: 'list/getSelList'
      })
    }
  }

  shouldComponentUpdate(nextProps){
    return !is(nextProps.sel, this.props.sel)
  }

  render() {
    const {sel, initState} = this.props
    let defaultSelData = initState
    
    //初次获取不渲染
    if(!sel){
        return '';
    }
    let seljs = sel.toJS()
    console.log('列表--子选择组建渲染')
    return (
        <Select
            showSearch
            defaultValue={defaultSelData}
            style={this.props.style || { width: 200,marginLeft: 20 }}
            placeholder="请选择"
            onSelect={this.selChange}
        >
            <Option key='0' value=''>全部</Option>
            {
            Object.keys(seljs).map((item)=>
                <Option key={item} value={item}>{seljs[item]}</Option>
            )
            }
        </Select>
    );
  }
}
