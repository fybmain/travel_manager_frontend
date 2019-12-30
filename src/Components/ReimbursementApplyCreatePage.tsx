import React, { Component } from 'react';
import { Form, Input, Upload, Icon, Button, Divider, Row, Col } from 'antd';
import { InputMoneyAmount } from './InputMoneyAmount';

export class ReimbursementApplyCreatePage extends Component {
  
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8, offset: 5 },
        sm: { span: 6, offset: 4 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 11 },
      },
    };
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 12 },
        sm: { span: 17, offset: 8 },
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
      <div className="tablePage">
        <Form { ...formItemLayout } layout="horizontal" labelAlign="left">
          <div style={{paddingTop: "50px"}}/>

          <Row>
            <Col span={11}>
              <Form.Item label="申请人">
                <p style={{textAlign: "left"}}>张可</p>
              </Form.Item>

              <Form.Item label="出差申请编号">
                <p style={{textAlign: "left"}}>445</p>
              </Form.Item>

              <Form.Item label="发票上传" wrapperCol={{sm: { span: 4 }}}>
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" />
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={2}>

              <Divider type="vertical"/>

            </Col>

            <Col span={11}>
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
            </Col>
          </Row>

          <Row>
            <Col span={7}/>
            <Col span={4}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
            <Col span={2}/>
            <Col span={4}>
              <Button type="default" htmlType="button">
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
