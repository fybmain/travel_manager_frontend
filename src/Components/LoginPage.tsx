import React from 'react';
import { Form, Input, Icon, Row, Col, Button, Checkbox } from 'antd';

import '../App.css';
import { RegisterDialog } from './RegisterDialog';

export class LoginPage extends React.Component {
  state = {
    registerDialogVisible: false,
  }

  handleRegister = (e: React.MouseEvent) => {
    this.setState({
      registerDialogVisible: true,
    });
  }

  handleRegisterCancel = (e: React.MouseEvent) => {
    this.setState({
      registerDialogVisible: false,
    });
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
                prefix={<Icon type="user"/>}
                size="large">
              </Input>
            </Form.Item>

            <Form.Item>
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="key"/>}
                size="large">
              </Input.Password>
            </Form.Item>


            <Row style={{marginTop: 0}}>
              <Checkbox style={{float:"left"}}>记住密码</Checkbox>
              <a style={{float:"right"}} onClick={this.handleRegister}>员工注册</a>
              <a style={{float:"right"}}>忘记密码？</a>
            </Row>

            <Form.Item>
              <Button
                onClick={(e) => {console.log(e);}}
                type="primary"
                htmlType="submit"
                style={{width: "100%"}}>
                立即登录
              </Button>
            </Form.Item>
          </Form>
          <RegisterDialog
            visible={this.state.registerDialogVisible}
            onCancel={this.handleRegisterCancel}/>
        </div>
      </div>
    )
  }
}
