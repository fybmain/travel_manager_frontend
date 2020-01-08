import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, Input, Icon, Button, message } from 'antd';
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
  @observable private password = "";
  @observable private repeatPassword="";

  constructor(props: ResetPasswordPageProps) {
    super(props);
    const result = this.props.location.search.match(/[?&]token=([A-Za-z0-9+/]*)/);
    if((result===null)||(result[1]==="")){
      this.props.history.replace("/home");
    }else{
      this.token = result[1];
    }
  }

  handleSubmit = async (e: React.MouseEvent) => {
    if(this.password===this.repeatPassword){
      const result = await UserApi.resetPassword(this.token, this.password);
      if(result.message==="ok"){
        message.success("重置密码成功");
        this.props.history.replace("/home");
      }else{
        message.error(result.message);
      }
    }else{
      message.warning("两次密码输入不一致");
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-content">
          <h1 style={{ textAlign: "center" }}>重置密码</h1>
          <Form>
            <Form.Item>
              <Input.Password
                placeholder="密码"
                prefix={<Icon type="key"/>}
                size="large"
                value={this.password}
                onChange={(e)=>{this.password=e.target.value;}}>
              </Input.Password>
            </Form.Item>

            <Form.Item>
              <Input.Password
                placeholder="确认密码"
                prefix={<Icon type="key"/>}
                size="large"
                value={this.repeatPassword}
                onChange={(e)=>{this.repeatPassword=e.target.value;}}>
              </Input.Password>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}>
                重置密码
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
