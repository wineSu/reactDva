import {Component} from 'react'
import { Input, Select, Form, Modal, DatePicker } from 'antd'
import { ListSel } from './ListSel'
import moment from 'moment'

const { Option } = Select;

class CreateCustom extends Component {
  
  onOk = () => {
    const prop = this.props
    prop.form.validateFields((err, values) => {
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      const val= {
        companyname: values.companyname,
        province: values.province,
        city: values.city,
        industry: values.industry || prop.editdata.industry,
        username: values.username,
        phone: values.phone,
        contact_phone: values.contact_phone,
        exp_time: values['exp_time'].format('YYYY-MM-DD HH:mm:ss')
      }
      let isEmpty = Object.keys(prop.editdata)
      if(isEmpty.length > 0){
        val.uid = prop.editdata.uid
      }
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
        title='新增客户'
      >
        <Form {...formItemLayout}>
          <Form.Item label="公司名称">
            {getFieldDecorator('companyname', {
              initialValue: editdata.campnyname,
              rules: [{required: true, message: '请填写升级计划名称'}],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="所在城市">
            {getFieldDecorator('province',{
              initialValue: editdata.provice
            })(
              <Select placeholder="请选择">
                <Option value="11">北京</Option>
                <Option value="12">天津</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="所属行业">
            {getFieldDecorator('industry', {
                rules: [{required: false}]
              })(
                <ListSel style={{width:200,marginLeft:0}} initState={editdata.industry}/>
            )}
          </Form.Item>
          <p className="line"></p>
          <Form.Item label="管理员姓名">
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入管理员姓名'}],
              initialValue: editdata.username
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
              rules: [{required: true, message: '请输入登录账号'}],
              initialValue: editdata.phone
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="登录账号">
            {getFieldDecorator('contact_phone', {
              rules: [{required: true, message: '请输入登录账号'}],
              initialValue: editdata.contact_phone
            })(
              <Input/>
            )}
          </Form.Item>
          
          <Form.Item label="过期时间">
            {getFieldDecorator('exp_time', {
              rules: [{required: true, message: '请选择时间'}],
              initialValue: moment(editdata.expire_time || new Date(), 'YYYY-MM-DD')
            })(
              <DatePicker
                style={{width: 200}}
                showTime
                format="YYYY-MM-DD"
                placeholder="请选择时间"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export const CreateCustomFormModal = Form.create()(CreateCustom)