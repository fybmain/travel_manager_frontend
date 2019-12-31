import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { HttpHelper } from '../Stores/HttpHelper';

export interface RegisterDialogProps {
    visible: boolean;
    onCancel?: (e: React.MouseEvent) => void;
};

export class RegisterDialog extends React.Component<RegisterDialogProps> {
  private email="";
  private name="";
  private password="";
  private repeatPassword="";
  private telephone="";
  private workId="";

  handleCancel = (e: React.MouseEvent) => {
    if(this.props.onCancel!==undefined){
      this.props.onCancel(e);
    }
  }

  handleOk = (e: React.MouseEvent) => {
    if(this.password!==this.repeatPassword){
      alert("两次密码输入不一致");
    }
    HttpHelper.register({
      email: this.email,
      name: this.name,
      password: this.password,
      telephone: this.telephone,
      workId: this.workId
    });
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
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
              onChange={(e)=>{this.workId=e.target.value;}}>
            </Input>
          </Form.Item>

          <Form.Item>
            <Input.Password
              placeholder="密码"
              prefix={<Icon type="key"/>}
              size="large"
              onChange={(e)=>{this.password=e.target.value;}}>
            </Input.Password>
          </Form.Item>
        
          <Form.Item>
            <Input.Password
              placeholder="确认密码"
              prefix={<Icon type="key"/>}
              size="large"
              onChange={(e)=>{this.repeatPassword=e.target.value;}}>
            </Input.Password>
          </Form.Item>
        
          <Form.Item>
            <Input
              placeholder="姓名"
              prefix={<Icon type="robot"/>}
              size="large"
              onChange={(e)=>{this.name=e.target.value;}}>
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="手机号"
              prefix={<Icon type="phone"/>}
              size="large"
              onChange={(e)=>{this.telephone=e.target.value;}}>
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="邮箱"
              prefix={<Icon type="mail"/>}
              size="large"
              onChange={(e)=>{this.email=e.target.value;}}>
            </Input>
          </Form.Item>

        </Form>
      </Modal>
    );
  }
};
