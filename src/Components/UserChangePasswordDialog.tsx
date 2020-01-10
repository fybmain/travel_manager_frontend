import React from 'react';
import { Modal, Form, Input, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { UserApi } from '../api/UserApi';
import UserInfoStore from '../Stores/UserInfoStore';

export interface UserChangePasswordPageProps {
    visible: boolean;
    destroyOnClose?: boolean;
    onClose?: () => void;
};

@observer
export class UserChangePasswordPage extends React.Component<UserChangePasswordPageProps> {
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
        destroyOnClose={true}>
        <UserChangePasswordForm onSuccess={this.handleClose}/>
      </Modal>
    );
  }
};

interface UserChangePasswordFormProps extends FormComponentProps {
  onSuccess?: () => void;
}

@observer
class UserChangePasswordFormProto extends React.Component<UserChangePasswordFormProps> {
  @observable private repeatPasswordDirty: boolean = false;

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

  handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        UserApi.setUserPassword(values.oldPassword, values.password).then(
          (result) => {
            if(result.message==="ok"){
              message.success("修改密码成功，请重新登录");
              UserInfoStore.logout();
              if(this.props.onSuccess){
                this.props.onSuccess();
              }
            }else{
              message.error(result.message);
            }
          }
        );
      }
    });
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="horizontal"
        style={{marginLeft: "20%", marginRight: "20%"}}>
        <h1 style={{ textAlign: "center" }}>修改密码</h1>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]
            })(
              <Input.Password
                placeholder="当前密码"
                prefix={<Icon type="key" />}
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
                  message: '新密码不能为空',
                },
                {
                  validator: this.validateRepeatPassword,
                },
              ]
            })(
              <Input.Password
                placeholder="新密码"
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

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit">
            修改密码
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const UserChangePasswordForm = Form.create<UserChangePasswordFormProps>({ name: 'changePassword' })(UserChangePasswordFormProto);
