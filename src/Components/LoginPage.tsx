import React from 'react';
import { Form, Input, Icon, Row, Button, Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import '../App.css';
import { RegisterDialog } from './RegisterDialog';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';

interface LoginPageProps {
  mainStore: MainStore;
}
@inject("mainStore") @observer
export class LoginPage extends React.Component<LoginPageProps> {
  @observable registerDialogVisible = false;
  workId = "";
  password = "";

  /*
  constructor(props: LoginPageProps) {
    super(props);
  }
  */
  handleRegister = (e: React.MouseEvent) => {
    this.registerDialogVisible = true;
  }

  handleRegisterCancel = (e: React.MouseEvent) => {
    this.registerDialogVisible = false;
  }

  handleLogin = async (e: React.MouseEvent) => {
    const result = await UserInfoStore.login({ workId: this.workId, password: this.password });
    if (result !== "ok") {
      alert(result);
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-content">
          <h1 style={{ textAlign: "center" }}>登录</h1>
          <Form
            layout="horizontal">

            <Form.Item>
              <Input
                placeholder="工号"
                prefix={<Icon type="workId" />}
                size="large"
                onChange={(e) => { this.workId = e.target.value; }}>
              </Input>
            </Form.Item>

            <Form.Item>
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="password" />}
                size="large"
                onChange={(e) => { this.password = e.target.value; }}>
              </Input.Password>
            </Form.Item>


            <Row style={{ marginTop: 0 }}>
              <button
                type="button"
                className="button-like-link"
                style={{ float: "right" }}
                onClick={this.handleRegister}>
                注册
              </button>
              <button
                type="button"
                className="button-like-link"
                style={{ float: "left" }}>
                忘记密码
              </button>
            </Row>

            <Form.Item>
              <Button
                onClick={this.handleLogin}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}>
                立即登录
            </Button>
            </Form.Item>
          </Form>
          <RegisterDialog
            visible={this.registerDialogVisible}
            onCancel={this.handleRegisterCancel} />
        </div>
      </div>
    );
  }
}
