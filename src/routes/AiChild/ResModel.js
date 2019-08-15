import {Component} from 'react'
import { Input, Form, Modal } from 'antd'
import { ListSel } from '../ListChild/ListSel'

const { TextArea } = Input;

class EditRes extends Component {
  
  onOk = () => {
    const prop = this.props
    prop.form.validateFields((err, values) => {
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
    })
  }

  onCancel = () => {
    this.props.form.resetFields();//重置Form表单的内容
    this.props.onCancel()//调用父组件给的方法
  }

  render() {
    
    console.log('AI列表组件--意向弹框组件渲染')
    const {getFieldDecorator} = this.props.form
    //编辑数据回显
    const {editdata} = this.props
    const formItemLayout = {
        labelCol: {
          sm: { span: 5 },
        },
        wrapperCol: {
          sm: { span: 10 },
        },
    }
    return (
      <Modal
        onOk={this.onOk}
        onCancel={this.onCancel}
        visible={this.props.visible}
        title='编辑意向结果'
      >
        <Form {...formItemLayout}>
          <Form.Item label="A类客户" >
            {getFieldDecorator('a', {
              initialValue: '强烈意向',
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="B类客户" >
            {getFieldDecorator('a', {
              initialValue: '有意向',
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="C类客户" >
            {getFieldDecorator('a', {
              initialValue: '需筛选',
            })(
              <Input/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export const EditResFormModal = Form.create()(EditRes)