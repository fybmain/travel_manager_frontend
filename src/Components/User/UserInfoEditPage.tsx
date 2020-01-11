import React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import history from '../../history';
import { MainStore } from '../../Stores/MainStore';
import UserInfoStore from '../../Stores/UserInfoStore';
import { UserApi } from '../../api/UserApi';

interface UserInfoEditPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class UserInfoEditPage extends React.Component<UserInfoEditPageProps> {
  constructor(props: UserInfoEditPageProps) {
    super(props);
    this.props.mainStore.breadcrumb=["用户", "个人信息", "编辑"];
  }

  handleFinish = () => {
    history.push('/user-info');
  }

  render() {
    return (
      <div className="tablePage">
        <div style={{ paddingTop: "50px" }} />
        <UserInfoEditForm
          onSuccess={this.handleFinish}
          onCancel={this.handleFinish}/>
      </div>
    );
  }
}

interface UserInfoEditFormProps extends FormComponentProps {
  onSuccess: () => void;
  onCancel: () => void;
}

class UserInfoEditFormProto extends React.Component<UserInfoEditFormProps> {
  handleCancel = () => {
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        UserApi.updateUserInfo({
          name: values.name,
          email: values.email,
          telephone: values.telephone,
        }).then((result) => {
          if(result.message==="ok"){
            message.success("修改成功");
            UserInfoStore.tryAutoLogin();
            if(this.props.onSuccess){
              this.props.onSuccess();
            }
          }else{
            message.error(result.message);
          }
        });
      }
    });
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
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        layout="horizontal">
        <Form.Item label="姓名">
          {
            this.props.form.getFieldDecorator('name', {
              initialValue: UserInfoStore.userInfo.name,
              rules: [
                {
                  required: true,
                  message: '姓名不能为空',
                },
              ]
            })(
              <Input
                placeholder="姓名"
                prefix={<Icon type="robot"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item label="工号">
          <p style={{ textAlign: "left" }}>{UserInfoStore.userInfo.workId}</p>
        </Form.Item>

        <Form.Item label="邮箱">
          {
            this.props.form.getFieldDecorator('email', {
              initialValue: UserInfoStore.userInfo.email,
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误',
                },
              ]
            })(
              <Input
                placeholder="邮箱"
                prefix={<Icon type="mail"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item label="手机号">
          {
            this.props.form.getFieldDecorator('telephone', {
              initialValue: UserInfoStore.userInfo.telephone,
              rules: [
                {
                  required: true,
                  message: '手机号不能为空',
                },
                {
                  pattern: /^[0-9]*$/,
                  message: '手机号应为纯数字',
                },
              ]
            })(
              <Input
                placeholder="手机号"
                prefix={<Icon type="phone"/>}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item {...tailItemLayout}>
          <div style={{textAlign: "center"}}>
            <Button
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
    );
  }
}

const UserInfoEditForm = Form.create<UserInfoEditFormProps>({ name: 'userInfoEdit' })(UserInfoEditFormProto);
