import React from 'react';
import { Modal, Form, Input, Icon, message } from 'antd';
import { observer } from 'mobx-react';

import { UserApi } from '../api/UserApi';
import { observable } from 'mobx';

export interface RegisterDialogProps {
    visible: boolean;
    onClose?: (e: React.MouseEvent) => void;
};

@observer
export class RegisterDialog extends React.Component<RegisterDialogProps> {
  @observable private email="";
  @observable private name="";
  @observable private password="";
  @observable private repeatPassword="";
  @observable private telephone="";
  @observable private workId="";

  handleClose = (e: React.MouseEvent) => {
    this.clearData();
    if(this.props.onClose){
      this.props.onClose(e);
    }
  }

  handleOk = async(e: React.MouseEvent) => {
    if(this.password===this.repeatPassword){
      const result= await UserApi.register({
        email: this.email,
        name: this.name,
        password: this.password,
        telephone: this.telephone,
        workId: this.workId
      });
      if(result.message==="ok"){
        message.success("注册成功");
        this.handleClose(e);
      }else{
        message.error(result.message);
      }
    }else{
      message.warning("两次密码输入不一致");
    }
  }

  clearData() {
    this.email = "";
    this.name = "";
    this.password = "";
    this.repeatPassword = "";
    this.telephone = "";
    this.workId = "";
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleClose}
        okText="注册"
        cancelText="取消">
        <h1 style={{ textAlign: "center" }}>注册</h1>
        <Form
          layout="horizontal"
          style={{marginLeft: "20%", marginRight: "20%"}}>
          
          <Form.Item>
            <Input
              placeholder="工号"
              prefix={<Icon type="user"/>}
              size="large"
              value={this.workId}
              onChange={(e)=>{this.workId=e.target.value;}}>
            </Input>
          </Form.Item>

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
            <Input
              placeholder="姓名"
              prefix={<Icon type="robot"/>}
              size="large"
              value={this.name}
              onChange={(e)=>{this.name=e.target.value;}}>
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="手机号"
              prefix={<Icon type="phone"/>}
              size="large"
              value={this.telephone}
              onChange={(e)=>{this.telephone=e.target.value;}}>
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="邮箱"
              prefix={<Icon type="mail"/>}
              size="large"
              value={this.email}
              onChange={(e)=>{this.email=e.target.value;}}>
            </Input>
          </Form.Item>

        </Form>
      </Modal>
    );
  }
};
