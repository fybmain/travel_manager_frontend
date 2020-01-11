import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Form, Input, Spin, message, Row, Col, Divider } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import { TravelApplyDetail, TravelApplyStatus, travelApplyStatusToString } from '../Models';
import { TravelApplyApi } from '../api/TravelApplyApi';

const { TextArea } = Input;

export interface TravelApplyDetailPageProps extends RouteComponentProps<{ applyId: string }> {
}

@inject("history") @observer
export class TravelApplyDetailPage extends React.Component<TravelApplyDetailPageProps> {
  @observable loading: boolean = true;
  @observable applyId: number = 0;
  @observable data!: TravelApplyDetail;

  constructor(props: TravelApplyDetailPageProps) {
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
      applicantName: "",
      comment: "",
      departmentId: 0,
      departmentName: "",
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
      status: TravelApplyStatus.DepartmentManagerRejected,
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
    if (result.message === "ok") {
      this.data = result.data;
    } else {
      message.error(result.message);
      throw result;
    }
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
    /*
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    */
    return (
      <div className="tablePage">
        <div style={{ paddingTop: "50px" }} />

        <Spin spinning={this.loading}>
          <Form {...formItemLayout} layout="horizontal">
            <Row>
              <Col span={10}>
                <Form.Item label="申请人">
                  {this.data.applicantName}
                </Form.Item>

                <Form.Item label="申请时间">
                  {this.data.applyTime.toLocaleDateString()}
                </Form.Item>

                <Form.Item label="部门">
                  {this.data.departmentName}
                </Form.Item>

                <Form.Item label="出差时间">
                  从 {this.data.startTime.toLocaleDateString()} 到 {this.data.endTime.toLocaleDateString()}
                </Form.Item>

                <Form.Item label="出差地点">
                  {this.data.province}省 {this.data.city}市
                </Form.Item>

                <Form.Item label="申请状态">
                  {travelApplyStatusToString(this.data.status)}
                </Form.Item>
                <Form.Item label="出差事由">
                  <TextArea
                    disabled={true}
                    rows={10}
                    value={this.data.reason} />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Divider type="vertical" />
              </Col>

              <Col span={9}>
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
                
                <Form.Item label="审批意见">
                  <TextArea
                    rows={8}
                    value={this.data.comment}
                    disabled={true} />
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Spin>
      </div>
    );
  }
}
