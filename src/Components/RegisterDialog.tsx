import React from 'react';
import { Modal, Form, Input, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { UserApi } from '../api/UserApi';

export interface RegisterDialogProps {
    visible: boolean;
    onClose?: () => void;
};

@observer
export class RegisterDialog extends React.Component<RegisterDialogProps> {
  handleClose = () => {
    if(this.props.onClose){
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.handleClose}
        footer={null}
        destroyOnClose={true}
        centered={true}>
        <h1 style={{ textAlign: "center" }}>注册</h1>
        <RegisterForm onSuccess={this.handleClose}/>
      </Modal>
    );
  }
};

interface RegisterFormProps extends FormComponentProps {
  onSuccess?: () => void;
}

@observer
class RegisterFormProto extends React.Component<RegisterFormProps> {
  @observable private repeatPasswordDirty: boolean = false;

  handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        const result= await UserApi.register({
          email: values.email,
          name: values.name,
          password: values.password,
          telephone: values.telephone,
          workId: values.workId
        });
        if(result.message==="ok"){
          message.success("注册成功");
          if(this.props.onSuccess){
            this.props.onSuccess();
          }
        }else{
          message.error(result.message);
        }
      }else{
        message.warning('表单上有错误');
      }
    });
  }

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if(value&&(value!==this.props.form.getFieldValue('password'))){
      callback('两次输入密码不一致');
    }else{
      callback();
    }
  };

  validateRepeatPassword = (rule: any, value: any, callback: any) => {
    if(value&&this.repeatPasswordDirty){
      this.props.form.validateFields(['repeatPassword'], { force: true });
    }
    callback();
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="horizontal"
        style={{marginLeft: "20%", marginRight: "20%"}}>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('workId', {
              rules: [
                {
                  required: true,
                  message: '工号不能为空',
                },
              ]
            })(
              <Input
                placeholder="工号"
                prefix={<Icon type="user" />}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
                {
                  validator: this.validateRepeatPassword,
                },
              ]
            })(
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="key" />}
                size="large"/>
            )
          }
        </Form.Item>
      
        <Form.Item>
          {
            this.props.form.getFieldDecorator('repeatPassword', {
              rules: [
                {
                  required: true,
                  message: '请再次输入密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ]
            })(
              <Input.Password
                placeholder="确认密码"
                prefix={<Icon type="key" />}
                size="large"
                onBlur={(e) => {this.repeatPasswordDirty = this.repeatPasswordDirty || (!!e.target.value);}}/>
            )
          }
        </Form.Item>
      
        <Form.Item>
          {
            this.props.form.getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '姓名不能为空',
                },
              ]
            })(
              <Input
                placeholder="姓名"
                prefix={<Icon type="robot"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('telephone', {
              rules: [
                {
                  required: true,
                  message: '手机号不能为空',
                },
                {
                  pattern: /^[0-9]*$/,
                  message: '手机号应为纯数字',
                },
              ]
            })(
              <Input
                placeholder="手机号"
                prefix={<Icon type="phone"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误',
                },
              ]
            })(
              <Input
                placeholder="邮箱"
                prefix={<Icon type="mail"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterForm = Form.create<RegisterFormProps>({ name: 'register' })(RegisterFormProto);
