import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export interface UserChangePasswordPageProps {
    visible: boolean;
    onCancel?: (e: React.MouseEvent) => void;
};

@observer
export class UserChangePasswordPage extends React.Component<UserChangePasswordPageProps> {
  @observable oldPassword="";
  @observable password="";
  @observable repeatPassword="";

  handleCancel = (e: React.MouseEvent) => {
    if(this.props.onCancel!==undefined){
      this.props.onCancel(e);
    }
  }

  handleOk = async(e: React.MouseEvent) => {
    if(this.password!==this.repeatPassword){
      alert("两次密码输入不一致");
    }
    ///////////////////
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确定"
        cancelText="取消">
        <h1 style={{ textAlign: "center" }}>修改密码</h1>
        <Form
          layout="horizontal"
          style={{marginLeft: "20%", marginRight: "20%"}}>

          <Form.Item>
            <Input.Password
              placeholder="当前密码"
              prefix={<Icon type="key"/>}
              size="large"
              value={this.oldPassword}
              onChange={(e)=>{this.oldPassword=e.target.value;}}>
            </Input.Password>
          </Form.Item>

          <Form.Item>
            <Input.Password
              placeholder="新密码"
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

        </Form>
      </Modal>
    );
  }
};
