import {Component} from 'react'
import { Input, Form, Modal } from 'antd'
import { Sel } from './sel'
const { TextArea } = Input;

class CreateCustom extends Component {
  
  onOk = () => {
    const prop = this.props
    prop.form.validateFields((err, values) => {
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      console.log(values)
      if(prop.editdata.id){
        values.id = prop.editdata.id
      }
      prop.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
    })
  }

  onCancel = () => {
    this.props.form.resetFields();//重置Form表单的内容
    this.props.onCancel()//调用父组件给的方法
  }

  render() {
    
    console.log('列表组件--弹框组件渲染')
    const {getFieldDecorator} = this.props.form
    const {editdata} = this.props
    //编辑数据回显
    const {selData} = this.props
    const formItemLayout = {
      layout: "inline"
    }
    return (
      <Modal
        onOk={this.onOk}
        onCancel={this.onCancel}
        visible={this.props.visible}
        title='新增客户'
      >
        <Form {...formItemLayout}>
          <Form.Item label="视图名称">
            {getFieldDecorator('ivrviewid', {
                initialValue: editdata.ivrviewid,
            })(
                <Sel style={{width:140,marginLeft:0}} initState={selData.iview} defaultState={editdata.ivrviewid}/>
            )}
          </Form.Item>
          <Form.Item label="语境分类" style={{marginLeft: 8}}>
            {getFieldDecorator('contexttype', {
                initialValue: editdata.contexttype,
            })(
                <Sel style={{width:140,marginLeft:0}} initState={selData.type} defaultState={editdata.contexttype}/>
            )}
          </Form.Item>
          <Form.Item label="内容" className="indent">
            {getFieldDecorator('callcontent', {
                initialValue: editdata.callcontent,
                rules: [{required: true}]
              })(
                <TextArea placeholder="请输入内容" rows={4}/>
            )}
          </Form.Item>
          <Form.Item label="关键词">
            {getFieldDecorator('tags', {
                initialValue: editdata.tags,
                rules: [{required: true}]
              })(
                <TextArea placeholder="请输入关键词" rows={2}/>
            )}
          </Form.Item>
          <Form.Item label="音频文件">
            {getFieldDecorator('filename', {
                initialValue: editdata.filename,
              })(
                <TextArea placeholder="请输入音频文件" rows={2}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export const CreateCustomFormModal = Form.create()(CreateCustom)