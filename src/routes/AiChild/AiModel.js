import {Component} from 'react'
import { Input, Form, Modal } from 'antd'
import { ListSel } from '../ListChild/ListSel'

const { TextArea } = Input;

class Edit extends Component {
  
  onOk = () => {
    const prop = this.props
    prop.form.validateFields((err, values) => {
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      const val= {
        project_name: values.project_name,
        project_desc: values.project_desc,
        industry: values.industry || prop.editdata.industry,
      }
      val.spzc_scene_id = prop.editdata.spzc_scene_id
      this.props.onOk(val);//调用父组件给的onOk方法并传入Form的参数。
    })
  }

  onCancel = () => {
    this.props.form.resetFields();//重置Form表单的内容
    this.props.onCancel()//调用父组件给的方法
  }

  render() {
    
    console.log('列表组件--弹框组件渲染')
    const {getFieldDecorator} = this.props.form
    //编辑数据回显
    const {editdata} = this.props
   
    return (
      <Modal
        onOk={this.onOk}
        onCancel={this.onCancel}
        visible={this.props.visible}
        title='编辑场景'
      >
        <Form layout="inline">
          <Form.Item label="场景名称" >
            {getFieldDecorator('project_name', {
              initialValue: editdata.project_name,
              rules: [{required: true, message: '请填写场景名称'}],
            })(
              <Input className="dialogInput"/>
            )}
          </Form.Item>
          <Form.Item label="行业" className="marginLeft20">
            {getFieldDecorator('industry', {
                rules: [{required: false}]
              })(
                <ListSel style={{width:130,marginLeft:0}} initState={editdata.industry}/>
            )}
          </Form.Item>
          <Form.Item label="场景描述" >
            {getFieldDecorator('project_desc', {
                initialValue: editdata.project_desc,
                rules: [{required: true}]
              })(
                <TextArea rows={4}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export const EditFormModal = Form.create()(Edit)