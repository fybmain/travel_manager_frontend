import React from 'react';
import { Form, Button, Row, Col, Card } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';

interface UserInfoPageProps extends RouteComponentProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
class UserInfoPage extends React.Component<UserInfoPageProps> {
  handleEdit = (e: React.MouseEvent) => {
    history.push('/user-info/edit');
  }

  handleEditPassword = (e: React.MouseEvent) => {
    history.push('/user-info/edit-password');
  }
  
  constructor(props:UserInfoPageProps){
    super(props);
    this.props.mainStore.breadcrumb=["用户", "个人信息"];
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
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.name}</p>
                  </Form.Item>
                  <Form.Item label="部门">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.departmentId}</p>
                  </Form.Item>
                  <Form.Item label="邮箱">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.email}</p>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label="工号">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.workId}</p>
                  </Form.Item>
                  <Form.Item label="职位">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.role}</p>
                  </Form.Item>
                  <Form.Item label="手机号">
                    <p style={{ textAlign: "left", marginLeft: "20%" }}>{UserInfoStore.userInfo.telephone}</p>
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

export default withRouter(UserInfoPage as any);
