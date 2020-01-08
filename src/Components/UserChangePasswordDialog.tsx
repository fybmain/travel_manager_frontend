import React from 'react';
import { Modal, Form, Input, Icon, message } from 'antd';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { UserApi } from '../api/UserApi';
import UserInfoStore from '../Stores/UserInfoStore';

export interface UserChangePasswordPageProps {
    visible: boolean;
    destroyOnClose?: boolean;
    onClose?: (e: React.MouseEvent) => void;
};

@observer
export class UserChangePasswordPage extends React.Component<UserChangePasswordPageProps> {
  @observable oldPassword = "";
  @observable password = "";
  @observable repeatPassword = "";

  clearData() {
    this.oldPassword = "";
    this.password = "";
    this.repeatPassword = "";
  }

  handleClose = (e: React.MouseEvent) => {
    this.clearData();
    if(this.props.onClose){
      this.props.onClose(e);
    }
  }

  handleSubmit = async(e: React.MouseEvent) => {
    if(this.password===this.repeatPassword){
      UserApi.setUserPassword(this.oldPassword, this.password).then(
        (result) => {
          if(result.message==="ok"){
            message.success("修改密码成功，请重新登录");
            UserInfoStore.logout();
            this.handleClose(e);
          }else{
            message.error(result.message);
          }
        }
      );
    }else{
      message.warning("两次密码输入不一致");
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.handleClose}
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
              onChange={(e) => { this.oldPassword=e.target.value; }}>
            </Input.Password>
          </Form.Item>

          <Form.Item>
            <Input.Password
              placeholder="新密码"
              prefix={<Icon type="key"/>}
              size="large"
              value={this.password}
              onChange={(e) => { this.password=e.target.value; }}>
            </Input.Password>
          </Form.Item>
        
          <Form.Item>
            <Input.Password
              placeholder="确认密码"
              prefix={<Icon type="key"/>}
              size="large"
              value={this.repeatPassword}
              onChange={(e) => { this.repeatPassword=e.target.value; }}>
            </Input.Password>
          </Form.Item>

        </Form>
      </Modal>
    );
  }
};
