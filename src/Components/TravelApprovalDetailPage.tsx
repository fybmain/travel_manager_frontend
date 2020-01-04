import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, Button, Input, Row, Col, Spin, message } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TravelApplyDetail, TravelApplyStatus } from '../Models/AllModels';
import { TravelApplyApi } from '../api/TravelApplyApi';

const { TextArea } = Input;

const isApplicationDone = (travelApplyStatus: TravelApplyStatus) => {
  switch(travelApplyStatus){
    case TravelApplyStatus.ApplicationApproved:
    case TravelApplyStatus.ApplicationNotApproved:
      return true;
    default:
      return false;
  }
}

export interface TravelApprovalDetailPageProps extends RouteComponentProps<{ applyId: string }>{
}

@inject("history") @observer
export class TravelApprovalDetailPage extends React.Component<TravelApprovalDetailPageProps> {
  @observable loading: boolean = true;
  @observable applyId:number = 0;
  @observable data!: TravelApplyDetail;

  constructor(props: TravelApprovalDetailPageProps) {
    super(props);
    this.applyId = parseInt(this.props.match.params.applyId);
    this.resetData();
    this.refreshData();
  }

  resetData() {
    this.data = {
      id: 0,
      applyTime: new Date(),
      applicantId: 0,
      departmentId: 0,
      startTime: new Date(),
      endTime: new Date(),
      province: "",
      city: "",
      paid: false,
      budget: {
        food: 0,
        hotel: 0,
        vehicle: 0,
        other: 0,
      },
      reason: "",
      status: TravelApplyStatus.ApplicationNotApproved,
    };
  }

  refreshData() {
    this.loading = true;
    this.resetData();
    this.doRefreshData().then(() => {
      this.loading = false;
    })
  }

  async doRefreshData() {
    const result = await TravelApplyApi.getTravelApplicationDetail(this.applyId);
    if(result.message==="ok"){
      this.data = result.data;
    }else{
      message.error(result.message);
      throw result;
    }
  }

  handleApprove = () => {
    TravelApplyApi.setTravelApplyApprovalStatus(this.applyId, true).then((result) => {
      if(result.message==="ok"){
        message.success("审批成功");
        this.props.history.push("/travel-approval");
      }else{
        message.error(result.message);
      }
    })
  }

  handleReject = () => {
    TravelApplyApi.setTravelApplyApprovalStatus(this.applyId, false).then((result) => {
      if(result.message==="ok"){
        message.success("驳回成功");
        this.props.history.push("/travel-approval");
      }else{
        message.error(result.message);
      }
    })
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
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    return (
      <div className="tablePage">
        <div style={{paddingTop: "50px"}}/>

        <Spin spinning={this.loading}>
          <Form { ...formItemLayout } layout="horizontal">
            <Form.Item label="申请人">
              {this.data.applicantId}
            </Form.Item>

            <Form.Item label="申请时间">
              {this.data.applyTime.toLocaleDateString()}
            </Form.Item>

            <Form.Item label="部门">
              {this.data.departmentId}
            </Form.Item>

            <Form.Item label="出差时间">
              从 {this.data.startTime.toLocaleDateString()} 到 {this.data.endTime.toLocaleDateString()}
            </Form.Item>

            <Form.Item label="出差地点">
              {this.data.province}省 {this.data.city}市
            </Form.Item>

            <Form.Item label="出差事由">
              <TextArea
                disabled={true}
                rows={10}
                value={this.data.reason}/>
            </Form.Item>

            <Form.Item label="酒店预算">
            {this.data.budget.hotel}元
            </Form.Item>

            <Form.Item label="车旅预算">
              {this.data.budget.vehicle}元
            </Form.Item>

            <Form.Item label="饮食预算">
              {this.data.budget.food}元
            </Form.Item>

            <Form.Item label="其他预算">
              {this.data.budget.other}元
            </Form.Item>

            <Form.Item {...tailItemLayout}>
            {
              isApplicationDone(this.data.status)?(
                <div/>
              ):(
                <Row>
                  <Col span={7}/>
                  <Col span={4}>
                    <Button
                      onClick={this.handleApprove}
                      type="primary"
                      htmlType="submit">
                      通过
                    </Button>
                  </Col>
                  <Col span={2}/>
                  <Col span={4}>
                    <Button
                      onClick={this.handleReject}
                      type="danger"
                      htmlType="button">
                      驳回
                    </Button>
                  </Col>
                  <Col span={7}/>
                </Row>
              )
            }
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
