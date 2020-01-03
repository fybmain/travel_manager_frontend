import React from 'react';
import { Form, Upload, Icon, Button, Divider, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

import { InputMoneyAmount } from './InputMoneyAmount';
import { MainStore } from '../Stores/MainStore';
import history from '../history';
import { userInfo } from 'os';

interface ReimbursementApplyCreatePageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApplyCreatePage extends React.Component<ReimbursementApplyCreatePageProps> {
  private applyId:string;
  constructor(props: ReimbursementApplyCreatePageProps){
    super(props);
    this.props.mainStore.breadcrumb = ["申请", "报销申请", "创建"];
    const searchParams = new URLSearchParams(history.location.search);
    this.applyId = searchParams.get('applyId')as string;
    console.log(this.applyId);
  }

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
                <p style={{textAlign: "left"}}>{userInfo.name}</p>
              </Form.Item>

              <Form.Item label="出差申请编号">
                <p style={{textAlign: "left"}}>{this.applyId}</p>
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
