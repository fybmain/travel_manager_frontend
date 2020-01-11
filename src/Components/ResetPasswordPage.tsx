import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, Input, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import '../App.css';
import { UserApi } from '../api/UserApi';
import { MainStore } from '../Stores/MainStore';

interface ResetPasswordPageProps extends RouteComponentProps {
  mainStore: MainStore;
}

@inject("mainStore", "history") @observer
export class ResetPasswordPage extends React.Component<ResetPasswordPageProps> {
  private token = "";

  constructor(props: ResetPasswordPageProps) {
    super(props);
    const result = this.props.location.search.match(/[?&]token=([A-Za-z0-9+/]*)/);
    if((result===null)||(result[1]==="")){
      this.props.history.replace("/home");
    }else{
      this.token = result[1];
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-content">
          <ResetPasswordForm
            token={this.token}
            onSuccess={() => {this.props.history.replace('/home');}}/>
        </div>
      </div>
    );
  }
}

interface ResetPasswordFormProps extends FormComponentProps {
  token: string;
  onSuccess: () => void;
}

class ResetPasswordFormProto extends React.Component<ResetPasswordFormProps> {
  @observable private repeatPasswordDirty: boolean = false;

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        const result = await UserApi.resetPassword(values.token, values.password);
        if(result.message==="ok"){
          message.success("重置密码成功");
          if(this.props.onSuccess){
            this.props.onSuccess();
          }
        }else{
          message.error(result.message);
        }
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
      <Form onSubmit={this.handleSubmit}>
        <h1 style={{ textAlign: "center" }}>重置密码</h1>

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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}>
            重置密码
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const ResetPasswordForm = Form.create<ResetPasswordFormProps>({ name: 'resetPasssword' })(ResetPasswordFormProto);
