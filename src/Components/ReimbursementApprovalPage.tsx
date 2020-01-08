import React, { Component } from 'react';
import { Form, Button, Divider, Row, Col, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import history from '../history';
import { Payment, ReimbursementApplyDetail } from '../Models';
import { ReimbursementApi } from '../api/ReimbursementApi';
import { MainStore } from '../Stores/MainStore';

import pic from "../Pictures/invoice1.png";

interface ReimbursementDetailPageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementDetailPage extends Component<ReimbursementDetailPageProps> {
  private applyId: number;
  private traveApplyId: number = -1;
  private name: string = "";
  private budget: Payment = {
    food: 0,
    hotel: 0,
    vehicle: 0,
    other: 0,
  }
  private payment: Payment = {
    food: 0,
    hotel: 0,
    vehicle: 0,
    other: 0,
  }
  private showButtons = false;
  @observable pending = true;

  constructor(props: ReimbursementDetailPageProps) {
    super(props);
    const searchParams = new URLSearchParams(history.location.search);
    const applyId = searchParams.get('applyId') as string;
    this.props.mainStore.breadcrumb = ["审批", "报销审批", applyId];
    this.applyId = Number(applyId);
    this.getApplyInfo();
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

    return (
      <div>
        {
          this.pending ?
            null
            : <div className="tablePage">
              <Form {...formItemLayout} layout="horizontal" labelAlign="left">
                <div style={{ paddingTop: "50px" }} />

                <Row>
                  <Col span={10}>
                    <Form.Item label="申请人">
                      <p style={{ textAlign: "left" }}>{this.name}</p>
                    </Form.Item>

                    <Form.Item label="出差申请编号">
                      <p style={{ textAlign: "left" }}>{this.traveApplyId}</p>
                    </Form.Item>

                    <Form.Item label="报销申请编号">
                      <p style={{ textAlign: "left" }}>{this.applyId}</p>
                    </Form.Item>

                    <Form.Item label="发票" wrapperCol={{ sm: { span: 4 } }}>
                      <img src={pic} alt="发票" className="img-box" />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    <Divider type="vertical" />
                  </Col>

                  <Col span={9} >
                    <Form.Item label="酒店报销金额" style={{ textAlign: "center" }}>
                      <PaymentAndBudget payment={this.payment.hotel} budget={this.budget.hotel} />
                    </Form.Item>
                    <Form.Item label="车旅报销金额">
                      <PaymentAndBudget payment={this.payment.vehicle} budget={this.budget.vehicle} />
                    </Form.Item>
                    <Form.Item label="饮食报销金额">
                      <PaymentAndBudget payment={this.payment.food} budget={this.budget.food} />
                    </Form.Item>
                    <Form.Item label="其他报销金额">
                      <PaymentAndBudget payment={this.payment.other} budget={this.budget.other} />
                    </Form.Item>
                  </Col>
                </Row>
                {
                  this.showButtons ?
                    <Row>
                      <Col span={7} />
                      <Col span={4}>
                        <Button type="primary" htmlType="submit" onClick={() => { approveApply(this.applyId, true) }}>
                          通过
                        </Button>
                      </Col>
                      <Col span={2} />
                      <Col span={4}>
                        <Button type="default" htmlType="button" onClick={() => { approveApply(this.applyId, false) }}>
                          驳回
                        </Button>
                      </Col>
                    </Row>
                    : null
                }
              </Form>
            </div>
        }
      </div>
    );
  }

  getApplyInfo = async () => {
    const result = await ReimbursementApi.getReimbursementApplyInfo({
      applyId: this.applyId,
    });
    if (result.message === "ok") {
      const data = result.items as ReimbursementApplyDetail;
      this.budget = data.budget;
      this.payment = data.payment;
      this.name = data.applicant;
      this.traveApplyId = data.travelApplyId;
      this.pending = false;
    }
    else {
      message.error(result.message);
    }
  }
}

const approveApply = async (applyId: number, approved: boolean) => {
  const result = await ReimbursementApi.approveReimbursementApply({
    applyId: applyId,
    approved: approved
  });
  if (result.message === "ok") {
    history.push("/reimbursement-approval");
  }
  else {
    message.error(result.message);
  }
}
class PaymentAndBudget extends Component<{ payment: number, budget: number }>{
  render() {
    return (
      <Row>
        <Col span={4} style={{ textAlign: "center" }}>
          {this.props.payment}
        </Col>
        <Col span={2} style={{ textAlign: "center" }}>
          元
      </Col>
        <Col span={2} />
        <Col style={{ textAlign: "left" }}>
          预算{this.props.budget}元
      </Col>
      </Row>);
  }
}
