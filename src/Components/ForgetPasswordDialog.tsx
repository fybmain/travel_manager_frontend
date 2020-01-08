import React from "react";
import { Modal, Form, Icon, Input, Result, message, Button } from "antd";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { UserApi } from "../api/UserApi";

export interface ForgetPasswordDialogProps {
  visible: boolean;
  onClose?: (e: React.MouseEvent) => void;
};

@observer
export class ForgetPasswordDialog extends React.Component<ForgetPasswordDialogProps> {
  @observable step = 1;
  @observable private workId = "";
  @observable private email = "";

  handleClose = (e: React.MouseEvent) => {
    this.clearData();
    if(this.props.onClose){
      this.props.onClose(e);
    }
  }

  handleOk = (e: React.MouseEvent) => {
    UserApi.forgetPassword(this.workId, this.email).then(
      (result) => {
        if(result.message==="ok"){
          this.step = 2;
        }else{
          message.error(result.message);
        }
      }
    )
  }

  clearData() {
    this.workId = "";
    this.email = "";
  }

  render() {
    switch(this.step){
      case 1:
        return (
          <Modal
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleClose}
            okText="找回密码"
            cancelText="取消">
            <h1 style={{ textAlign: "center" }}>忘记密码</h1>
            <Form.Item>
                <Input
                  placeholder="工号"
                  prefix={<Icon type="user"/>}
                  size="large"
                  value={this.workId}
                  onChange={(e) => {this.workId=e.target.value;}}>
                </Input>
              </Form.Item>
            <Form.Item>
              <Input
                placeholder="邮箱"
                prefix={<Icon type="mail"/>}
                size="large"
                value={this.email}
                onChange={(e) => {this.email=e.target.value;}}>
              </Input>
            </Form.Item>
          </Modal>
        );
      case 2:
        return (
          <Modal
            visible={this.props.visible}
            footer={null}
            onCancel={this.handleClose}>
            <Result
              status="success"
              title="找回密码邮件已发送，请登录邮箱查收"
              extra={
                <Button type="primary" onClick={this.handleClose}>确定</Button>
              }>
            </Result>
          </Modal>
        );
      default:
        return null;
    }
  }
}
