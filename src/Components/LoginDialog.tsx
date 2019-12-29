import React from 'react';
import { Modal, Form, Input, Icon, Row } from 'antd';

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
        <h1 style={{ textAlign: "center" }}>登录</h1>
        <Form
          layout="horizontal"
          style={{marginLeft: "20%", marginRight: "20%"}}>
          
          <Form.Item>
            <Input
              placeholder="工号"
              prefix={<Icon type="number"/>}
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
        
        </Form>
      </Modal>
    );
  }
};
