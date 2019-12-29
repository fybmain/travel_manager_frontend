import React, { Component } from 'react';
import { Form, Input, DatePicker, Upload, Icon, Button } from 'antd';
import { InputMoneyAmount } from './InputMoneyAmount';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export class ReimbursementApplyPage extends Component {
  
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0},
        sm: { span: 16, offset: 8},
      },
    };
    const uploadProps = {
      name: 'file',
      action: 'https://example.com/upload',
      headers: { },
      onChange() {
      },
    };
    return (
      <div className="page-central">
        <Form { ...formItemLayout } layout="horizontal">
          <Form.Item label="申请人">
            <Input disabled={true} value="张可"/>
          </Form.Item>

          <Form.Item label="出差时间">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item label="发票上传">
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" />
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="酒店报销金额">
           <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="车旅报销金额">
           <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="饮食报销金额">
            <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="其他报销金额">
            <InputMoneyAmount />
          </Form.Item>

          <Form.Item { ...tailItemLayout }>
            <Button type="primary" htmlType="submit">
              提交报销申请
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
