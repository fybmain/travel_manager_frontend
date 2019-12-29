import React from 'react';
import { Modal, Form, Button, Input } from 'antd';

export interface LoginDialogProps {
    visible: boolean;
};

export class LoginDialog extends React.Component<LoginDialogProps> {
  handleCancel = (e: React.MouseEvent) => {
  }

  handleOk = (e: React.MouseEvent) => {
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="登录"
        cancelText="取消">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form>
          
          <Form.Item label="工号">
            <Input></Input>
          </Form.Item>

          <Form.Item label="密码">
            <Input.Password></Input.Password>
          </Form.Item>
        
        </Form>
      </Modal>
    );
  }
};
