import React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';
import { UserApi } from '../api/UserApi';

interface UserInfoEditPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class UserInfoEditPage extends React.Component<UserInfoEditPageProps> {
  @observable name: string;
  @observable email: string;
  @observable telephone: string;

  constructor(props: UserInfoEditPageProps) {
    super(props);
    this.props.mainStore.breadcrumb=["用户", "个人信息", "编辑"];
    this.name = UserInfoStore.userInfo.name;
    this.email = UserInfoStore.userInfo.email;
    this.telephone = UserInfoStore.userInfo.telephone;
  }

  handleSubmit = (e: React.MouseEvent) => {
    UserApi.updateUserInfo({
      name: this.name,
      email: this.email,
      telephone: this.telephone,
    }).then((result) => {
      if(result.message==="ok"){
        UserInfoStore.tryAutoLogin();
        message.success("修改成功");
        history.push('/user-info');
      }else{
        message.error(result.message);
      }
    });
  }

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
          <Form.Item label="姓名">
            <Input
              value={this.name}
              onChange={(e) => {this.name = e.target.value}}
              placeholder="姓名"
              prefix={<Icon type="user" />}
              size="large" />
          </Form.Item>

          <Form.Item label="工号">
            <p style={{ textAlign: "left" }}>{UserInfoStore.userInfo.workId}</p>
          </Form.Item>

          <Form.Item label="邮箱">
            <Input
              value={this.email}
              onChange={(e) => {this.email = e.target.value}}
              prefix={<Icon type="mail" />}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item label="手机号">
            <Input
              value={this.telephone}
              onChange={(e) => {this.telephone = e.target.value}}
              prefix={<Icon type="phone" />}
              size="large">
            </Input>
          </Form.Item>

          <Form.Item {...tailItemLayout}>
            <div style={{textAlign: "center"}}>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                htmlType="submit">
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
