import React from 'react';
import { Form, Input, Button, DatePicker, message, Row, Col } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import history from '../history';
import { InputMoneyAmount } from './InputMoneyAmount';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';
import { TravelApplyApi } from '../api/TravelApplyApi';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface TravelApplyCreatePageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class TravelApplyCreatePage extends React.Component<TravelApplyCreatePageProps> {
  @observable city = "";
  @observable province = "";
  @observable timeRange: [moment.Moment, moment.Moment] = [moment(), moment()];
  @observable budget = {
    food: 0,
    hotel: 0,
    vehicle: 0,
    other: 0,
  }
  @observable reason = "";

  constructor(props:TravelApplyCreatePageProps){
    super(props);
    this.props.mainStore.breadcrumb=["申请", "出差申请", "创建"];
  }

  handleDateRangeChange = (dates: any, dateStrings: string[]) => {
    this.timeRange = [moment(dateStrings[0]), moment(dateStrings[1])];
  }

  handleSubmit = () => {
    TravelApplyApi.createTravelApplication({
      city: this.city,
      province: this.province,
      startTime: this.timeRange[0].toDate(),
      endTime: this.timeRange[1].toDate(),
      budget: this.budget,
      reason: this.reason,
    }).then(
      (result) => {
        if(result.message==="ok"){
          message.success("创建成功");
          history.push("/travel-apply");
        }else{
          message.error(result.message);
        }
      }
    );
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 12 },
      },
    };
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      },
    };
    return (
      <div className="tablePage">
        <div style={{paddingTop: "50px"}}/>

        <Form { ...formItemLayout } layout="horizontal">
          <Form.Item label="申请人">
            <Input
              disabled={true}
              value={UserInfoStore.userInfo.name}/>
          </Form.Item>

          <Form.Item label="出差时间">
            <RangePicker
              value={this.timeRange}
              onChange={this.handleDateRangeChange}/>
          </Form.Item>

          <Form.Item label="出差地点">
            <Row>
              <Col span={6}>
                <span>
                <Input
                  value={this.province}
                  onChange={(e) => {this.province = e.target.value}}/>
                </span>
              </Col>
              <Col span={1}>省</Col>
              <Col span={6}>
                <span>
                  <Input
                    value={this.city}
                    onChange={(e) => {this.city = e.target.value}}/>
                </span>
              </Col>
              <Col span={1}>市</Col>
            </Row>
          </Form.Item>

          <Form.Item label="出差事由">
            <TextArea
              rows={10}
              value={this.reason}
              onChange={(e) => {this.reason = e.target.value}}/>
          </Form.Item>

          <Form.Item label="酒店预算">
           <InputMoneyAmount
            value={this.budget.hotel}
            onChange={(value) => {this.budget.hotel = value;}}/>
          </Form.Item>

          <Form.Item label="车旅预算">
           <InputMoneyAmount
            value={this.budget.vehicle}
            onChange={(value) => {this.budget.vehicle = value;}}/>
          </Form.Item>

          <Form.Item label="饮食预算">
            <InputMoneyAmount
              value={this.budget.food}
              onChange={(value) => {this.budget.food = value;}}/>
          </Form.Item>

          <Form.Item label="其他预算">
            <InputMoneyAmount
              value={this.budget.other}
              onChange={(value) => {this.budget.other = value;}}/>
          </Form.Item>

          <Form.Item { ...tailItemLayout }>
            <Button
              onClick={this.handleSubmit}
              type="primary"
              htmlType="submit">
              提交出差申请
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
