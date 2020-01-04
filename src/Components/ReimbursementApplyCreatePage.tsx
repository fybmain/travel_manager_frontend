import React from 'react';
import { Form, Upload, Icon, Button, Divider, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

import { InputMoneyAmount } from './InputMoneyAmount';
import { MainStore } from '../Stores/MainStore';
import history from '../history';
import UserInfoStore from '../Stores/UserInfoStore';
import { observable } from 'mobx';
import { ReimbursementApi } from '../api/ReimbursementApi';
import { Payment } from '../Models/AllModels';

interface ReimbursementApplyCreatePageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApplyCreatePage extends React.Component<ReimbursementApplyCreatePageProps> {
  private applyId: number;
  @observable budget:Payment = {
    food: 0,
    hotel: 0,
    vehicle: 0,
    other: 0,
  }
  constructor(props: ReimbursementApplyCreatePageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["申请", "报销申请", "创建"];
    const searchParams = new URLSearchParams(history.location.search);
    const applyId=searchParams.get('applyId') as string;
    this.applyId = Number(applyId);
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
      headers: {},
      onChange() {
      },
    };
    return (
      <div className="tablePage">
        <Form {...formItemLayout} layout="horizontal" labelAlign="left">
          <div style={{ paddingTop: "50px" }} />

          <Row>
            <Col span={11}>
              <Form.Item label="申请人">
                <p style={{ textAlign: "left" }}>{UserInfoStore.userInfo.name}</p>
              </Form.Item>

              <Form.Item label="出差申请编号">
                <p style={{ textAlign: "left" }}>{this.applyId}</p>
              </Form.Item>

              <Form.Item label="发票上传" wrapperCol={{ sm: { span: 4 } }}>
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" />
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={2}>

              <Divider type="vertical" />

            </Col>

            <Col span={11}>
              <Form.Item label="酒店报销金额">
                <InputMoneyAmount
                  value={this.budget.hotel}
                  onChange={(value) => { this.budget.hotel = value; }} />
              </Form.Item>

              <Form.Item label="车旅报销金额">
                <InputMoneyAmount
                  value={this.budget.vehicle}
                  onChange={(value) => { this.budget.vehicle = value; }} />
              </Form.Item>

              <Form.Item label="饮食报销金额">
                <InputMoneyAmount
                  value={this.budget.food}
                  onChange={(value) => { this.budget.food = value; }} />
              </Form.Item>

              <Form.Item label="其他报销金额">
                <InputMoneyAmount
                  value={this.budget.other}
                  onChange={(value) => { this.budget.other = value; }} />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ padding: '20px' }}>
            <Col span={8} />
            <Col span={3}>
              <Button type="primary" htmlType="submit"
              onClick={this.handleSubmit}>
                提交
              </Button>
            </Col>
            <Col span={2} />
            <Col span={3}>
              <Button type="default" htmlType="button"
              onClick={()=>history.push('/reimbursement-apply')}>
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  handleSubmit = async() => {
    const result = await ReimbursementApi.createReimbursementApply({
      payment: this.budget,
      pictureIds: [],
      travelApplyId: Number(this.applyId)
    });
    if (result.message === "ok") {
      alert("创建成功")
    }
    else {
      alert(result.message);
    }
  }

}
