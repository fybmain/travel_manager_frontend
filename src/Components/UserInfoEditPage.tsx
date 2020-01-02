import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

import history from '../history';
import { MainStore } from '../Stores/MainStore';

interface UserInfoEditPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class UserInfoEditPage extends React.Component<UserInfoEditPageProps> {
  constructor(props: UserInfoEditPageProps) {
    super(props);
    this.props.mainStore.breadcrumb=["用户", "个人信息", "编辑"];
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
