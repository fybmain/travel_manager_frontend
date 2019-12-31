import React from 'react';
import { Form, Input, Icon, Row, Col, Button, Checkbox } from 'antd';

import '../App.css';
import { Link } from 'react-router-dom';
import { HttpHelper } from '../Stores/HttpHelper';
import { RegisterDialog } from './RegisterDialog';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { render } from '@testing-library/react';

@observer
export class LoginPage extends React.Component {
  @observable registerDialogVisible=false;
  workId="";
  password="";

  handleRegister = (e: React.MouseEvent) => {
    this.registerDialogVisible=true;
  }

  handleRegisterCancel = (e: React.MouseEvent) => {
    this.registerDialogVisible=false;
  }

  handleLogin =(e:React.MouseEvent)=>{
    HttpHelper.login({workId:this.workId,password:this.password});
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
                prefix={<Icon type="workId"/>}
                size="large"
                onChange={(e)=>{this.workId=e.target.value;}}>
              </Input>
            </Form.Item>

            <Form.Item>
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="password"/>}
                size="large"
                onChange={(e)=>{this.password=e.target.value;}}>
              </Input.Password>
            </Form.Item>


            <Row style={{marginTop: 0}}>
              <Checkbox style={{float:"left"}}>记住密码</Checkbox>
              <a style={{float:"right"}} onClick={this.handleRegister}>&nbsp;&nbsp;&nbsp;注册</a>
              <a style={{float:"right"}}>忘记密码</a>
            </Row>

            <Form.Item>
              <Button
                onClick={this.handleLogin}
                type="primary"
                htmlType="submit"
                style={{width: "100%"}}>
                立即登录
              </Button>
            </Form.Item>
          </Form>
          <RegisterDialog
            visible={this.registerDialogVisible}
            onCancel={this.handleRegisterCancel}/>
        </div>
      </div>
    )
  }
}
