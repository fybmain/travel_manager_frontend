import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';

export interface RegisterDialogProps {
    visible: boolean;
};

export class RegisterDialog extends React.Component<RegisterDialogProps> {
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
        okText="注册"
        cancelText="取消">
        <h1 style={{ textAlign: "center" }}>注册</h1>
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
        
          <Form.Item>
            <Input.Password
              placeholder="确认密码"
              prefix={<Icon type="key"/>}
              size="large">
            </Input.Password>
          </Form.Item>
        
          <Form.Item>
            <Input
              placeholder="姓名"
              prefix={<Icon type="user"/>}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="手机号"
              prefix={<Icon type="phone"/>}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="邮箱"
              prefix={<Icon type="mail"/>}
              size="large">
            </Input>
          </Form.Item>

        </Form>
      </Modal>
    );
  }
};
