import {Component} from 'react'
import { Select } from 'antd'

const { Option } = Select;

//行业选择 组件
export class Sel extends Component {

  //下拉选择
  selChange = (value) => {
    const { onchange, onChange  } = this.props
    //弹框中透传给form表单
    onChange && onChange(value)
    //父组件中透传事件
    onchange && onchange(value)
  }

  shouldComponentUpdate(){
    return false
  }

  render() {
    const {initState, defaultState} = this.props
    //初次获取不渲染
    if(!initState){
        return '';
    }
    
    console.log('知识库列表--子选择组建渲染')
    return (
        <Select
            showSearch
            defaultValue={defaultState || ''}
            style={this.props.style || { width: 210,marginLeft: 20 }}
            placeholder="请选择"
            onSelect={this.selChange}
        >
            <Option key='0' value=''>全部</Option>
            {
            Object.keys(initState).map((item)=>
                <Option key={item} value={item}>{initState[item]}</Option>
            )
            }
        </Select>
    );
  }
}
