import React from 'react';
import { Form, Input, Button, Icon, Row, Col, Card } from 'antd';

import history from '../history';

export class UserInfoPage extends React.Component {
  handleEdit = (e: React.MouseEvent) => {
    history.push('/user-info/edit');
  }

  handleEditPassword = (e: React.MouseEvent) => {
    history.push('/user-info/edit-password');
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 5, offset: 0 },
        sm: { span: 5, offset: 0 },
      },
      wrapperCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
    };
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 8, offset: 8 },
        sm: { span: 8, offset: 8 },
      },
    };
    return (
      <div>
        <div className="card-margin">

          <Card title="个人信息" className="userInfo-box">
            <Form {...formItemLayout} layout="horizontal">
              <Row>
                <Col span={3} />
                <Col span={10}>
                  <Form.Item label="姓名">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>王晓明</p>
                  </Form.Item>
                  <Form.Item label="部门">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>财务部</p>
                  </Form.Item>
                  <Form.Item label="邮箱">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>xiaoming_wang@qq.com</p>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label="工号">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>2016242976</p>
                  </Form.Item>
                  <Form.Item label="职位">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>部门经理</p>
                  </Form.Item>
                  <Form.Item label="手机号">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>114514191981</p>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
        <Form>
          <Form.Item {...tailItemLayout}>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={this.handleEdit}
                type="primary"
                htmlType="submit">
                修改信息
              </Button>
              <Button
                onClick={this.handleEditPassword}
                type="primary"
                htmlType="button"
                style={{ marginLeft: "20%" }}>
                修改密码
              </Button>
            </div>
          </Form.Item>
        </Form></Card>
        </div>
      </div>
    );
  }
}
