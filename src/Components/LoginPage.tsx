import React from 'react';
import { Form, Input, Icon, Row, Col, Button, Checkbox } from 'antd';

import '../App.css';
import { Link } from 'react-router-dom';
import { HttpHelper } from '../Stores/HttpHelper';
import { RegisterDialog } from './RegisterDialog';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { render } from '@testing-library/react';
import history from '../history';
import { MainStore } from '../Stores/MainStore';
import { userInfo } from 'os';
import { UserInfo } from '../Models/AllModels';
import Axios from 'axios';

interface LoginPageProps {
  mainStore: MainStore;
}
@inject("mainStore") @observer
export class LoginPage extends React.Component<LoginPageProps> {
  @observable registerDialogVisible = false;
  @observable visible = false;
  workId = "";
  password = "";

  constructor(props: LoginPageProps) {
    super(props);
    this.props.mainStore.init();
    this.autoLogin();
  }
  handleRegister = (e: React.MouseEvent) => {
    this.registerDialogVisible = true;
  }

  handleRegisterCancel = (e: React.MouseEvent) => {
    this.registerDialogVisible = false;
  }

  handleLogin = async (e: React.MouseEvent) => {
    const result = await HttpHelper.login({ workId: this.workId, password: this.password });
    if (result.message == "ok") {
      alert("登录成功");
      console.log(result.userInfo)
      this.props.mainStore.userInfo = result.userInfo as UserInfo;
      localStorage.setItem('Travel-Manager-User-Token', result.token as string);
      history.push("/home");
    } else {
      alert(result.message);
    }
  }

  autoLogin = async () => {
    const result = await HttpHelper.autoLogin();
    if (result.message == "ok") {
      //alert("自动登录成功");
      console.log(result.userInfo)
      this.props.mainStore.userInfo = result.userInfo as UserInfo;
      localStorage.setItem('Travel-Manager-User-Token', result.token as string);
      history.push("/home");
    }
    this.visible = true;
  }

  render() {
    if (this.visible) {
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
                <Checkbox style={{ float: "left" }}>记住密码</Checkbox>
                <a style={{ float: "right" }} onClick={this.handleRegister}>&nbsp;&nbsp;&nbsp;注册</a>
                <a style={{ float: "right" }}>忘记密码</a>
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
    } else {
      return <div/>;
    }

  }
}
