import React from 'react';
import { Modal, Form, Icon, Input, Result, message, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { UserApi } from '../../api/UserApi';

export interface ForgetPasswordDialogProps {
  visible: boolean;
  onClose?: (e: React.MouseEvent) => void;
};

@observer
export class ForgetPasswordDialog extends React.Component<ForgetPasswordDialogProps> {
  @observable step: number = 1;

  handleClose = (e: React.MouseEvent) => {
    this.clearData();
    if(this.props.onClose){
      this.props.onClose(e);
    }
  }

  clearData() {
    this.step = 1;
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.handleClose}
        footer={null}
        destroyOnClose={true}
        centered={true}>
        {
          (this.step===2)?(
            <Result
              status="success"
              title="找回密码邮件已发送，请登录邮箱查收"
              extra={
                <Button type="primary" onClick={this.handleClose}>确定</Button>
              }/>
          ):(
            <ForgetPasswordForm onSuccess={() => {this.step = 2;}}/>
          )
        }
      </Modal>
    );
  }
}

export interface ForgetPasswordFormProps extends FormComponentProps {
  onSuccess?: (e: React.FormEvent) => void;
};

@observer
class ForgetPasswordFormProto extends React.Component<ForgetPasswordFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        UserApi.forgetPassword(values.workId, values.email).then(
          (result) => {
            if(result.message==="ok"){
              if(this.props.onSuccess){
                this.props.onSuccess(e);
              }
            }else{
              message.error(result.message);
            }
          }
        );
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1 style={{ textAlign: "center" }}>忘记密码</h1>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('workId', {
              rules: [
                {
                  required: true,
                  message: '工号不能为空',
                },
              ]
            })(
              <Input
                placeholder="工号"
                prefix={<Icon type="user" />}
                size="large"/>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            this.props.form.getFieldDecorator('email', {
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

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit">
            找回密码
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const ForgetPasswordForm = Form.create<ForgetPasswordFormProps>({ name: 'forgetPassword' })(ForgetPasswordFormProto);
