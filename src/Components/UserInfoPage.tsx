import React from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';

export class UserInfoPage extends React.Component {
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
          <Form.Item label="姓名">
            <Input
              value="王晓明"
              placeholder="姓名"
              prefix={<Icon type="user" />}
              size="large" />
          </Form.Item>

          <Form.Item label="工号">
            <p style={{ textAlign: "left" }}>2016242976</p>
          </Form.Item>

          <Form.Item label="邮箱">
            <Input
              prefix={<Icon type="mail" />}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item label="手机号">
            <Input
              prefix={<Icon type="phone" />}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item {...tailItemLayout}>
            <Row>
              <Col span={8}>
                <Button type="primary" htmlType="submit">
                  修改信息
                </Button>
              </Col>
              <Col span={8}/>
              <Col span={8}>
                <Button type="primary" htmlType="submit">
                  修改密码
                </Button>
              </Col>
            </Row>

          </Form.Item>
        </Form>
      </div>
    );
  }
}
