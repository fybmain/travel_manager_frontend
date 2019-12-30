import React from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';

import history from '../history';

export class UserPasswordEditPage extends React.Component {
  handleCancel = (e: React.MouseEvent) => {
    history.push('/user-info');
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 4, offset: 10 },
        sm: { span: 4, offset: 10 },
      },
    };
    return (
      <div className="tablePage">
        <div style={{ paddingTop: "50px" }} />

        <Form {...formItemLayout} layout="horizontal">
          <Form.Item label="当前密码">
            <Input.Password
              placeholder="当前密码"
              prefix={<Icon type="key" />}
              size="large" />
          </Form.Item>

          <Form.Item label="新密码">
            <Input.Password
              placeholder="新密码"
              prefix={<Icon type="key" />}
              size="large" />
          </Form.Item>

          <Form.Item label="重复新密码">
            <Input.Password
              placeholder="重复新密码"
              prefix={<Icon type="key" />}
              size="large" />
          </Form.Item>

          <Form.Item {...tailItemLayout}>
            <div style={{textAlign: "center"}}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                onClick={this.handleCancel}
                type="default"
                htmlType="button"
                style={{marginLeft: "20%"}}>
                返回
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
