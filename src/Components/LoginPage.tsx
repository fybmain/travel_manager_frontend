import React from 'react';
import { Form, Input, Icon, Row, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import '../App.css';
import { RegisterDialog } from './RegisterDialog';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';
import { ForgetPasswordDialog } from './ForgetPasswordDialog';

interface LoginPageProps extends FormComponentProps {
  mainStore: MainStore;
}
@inject("mainStore") @observer
export class LoginPage extends React.Component<LoginPageProps> {
  @observable registerDialogVisible = false;
  @observable forgetPasswordDialogVisible = false;

  /*
  constructor(props: LoginPageProps) {
    super(props);
  }
  */

  render() {
    return (
      <div className="login-background">
        <div className="login-content">
          <LoginForm
            onRegister={() => {this.registerDialogVisible = true;}}
            onForgetPassword={() => {this.forgetPasswordDialogVisible = true;}}/>
        </div>

        <RegisterDialog
          visible={this.registerDialogVisible}
          onClose={() => {this.registerDialogVisible = false;}} />
        <ForgetPasswordDialog
          visible={this.forgetPasswordDialogVisible}
          onClose={() => {this.forgetPasswordDialogVisible = false;}} />
      </div>
    );
  }
}

interface LoginFormProps extends FormComponentProps {
  onSuccess?: () => void;
  onRegister?: () => void;
  onForgetPassword?: () => void;
}

@observer
class LoginFormProto extends React.Component<LoginFormProps> {

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const result = await UserInfoStore.login({ workId: values.workId, password: values.password });
        if (result === "ok") {
          if(this.props.onSuccess){
            this.props.onSuccess();
          }
        }else{
          message.error(result);
        }
      }
    });

  }

  render() {
    return (
      <Form
        layout="horizontal"
        onSubmit={this.handleSubmit}>
        <h1 style={{ textAlign: "center" }}>登录</h1>

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
                prefix={<Icon type="workId" />}
                size="large">
              </Input>
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
              ]
            })(
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="password" />}
                size="large">
              </Input.Password>
            )
          }

        </Form.Item>


        <Row style={{ marginTop: 0 }}>
          <button
            onClick={() => {if(this.props.onRegister){this.props.onRegister();}}}
            type="button"
            className="button-like-link"
            style={{ float: "right" }}>
            注册
          </button>
          <button
            onClick={() => {if(this.props.onForgetPassword){this.props.onForgetPassword();}}}
            type="button"
            className="button-like-link"
            style={{ float: "left" }}>
            忘记密码
          </button>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}>
            立即登录
        </Button>
        </Form.Item>

      </Form>
    );
  }
}

const LoginForm = Form.create<LoginFormProps>({ name: 'login' })(LoginFormProto)
