import React from 'react';
import { Form, Input, Button, DatePicker, message, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

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
  constructor(props:TravelApplyCreatePageProps){
    super(props);
    this.props.mainStore.breadcrumb=["申请", "出差申请", "创建"];
  }

  render() {
    return (
      <div className="tablePage">
        <div style={{paddingTop: "50px"}}/>
        <TravelApplyCreateForm onSuccess={() => {history.push("/travel-apply");}}/>
      </div>
    );
  }
}

interface TravelApplyCreateFormProps extends FormComponentProps {
  onSuccess: () => void;
}

class TravelApplyCreateFormProto extends React.Component<TravelApplyCreateFormProps> {

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        TravelApplyApi.createTravelApplication({
          startTime: values.timeRange[0].toDate(),
          endTime: values.timeRange[1].toDate(),
          province: values.province,
          city: values.city,
          reason: values.reason,
          budget: {
            hotel: values.hotelBudget,
            vehicle: values.vehicleBudget,
            food: values.foodBudget,
            other: values.otherBudget,
          },
        }).then(
          (result) => {
            if(result.message==="ok"){
              message.success("创建成功");
              if(this.props.onSuccess){
                this.props.onSuccess();
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
      <Form
        onSubmit={this.handleSubmit}
        { ...formItemLayout }
        layout="horizontal">

        <Form.Item label="申请人">
          <Input
            disabled={true}
            value={UserInfoStore.userInfo.name}/>
        </Form.Item>

        <Form.Item label="出差时间">
          {
            this.props.form.getFieldDecorator('timeRange', {
              rules: [
                {
                  required: true,
                  message: '出差时间不能为空',
                },
              ]
            })(
              <RangePicker/>
            )
          }
        </Form.Item>

        <Form.Item label="出差地点">
          <Row>
            <Col span={6}>
              <span>
                {
                  this.props.form.getFieldDecorator('province', {
                    rules: [
                      {
                        required: true,
                        message: '省份不能为空',
                      },
                    ]
                  })(
                    <Input/>
                  )
                }
              </span>
            </Col>
            <Col span={1}>省</Col>
            <Col span={6}>
              <span>
                {
                  this.props.form.getFieldDecorator('city', {
                    rules: [
                      {
                        required: true,
                        message: '城市不能为空',
                      },
                    ],
                  })(
                    <Input/>
                  )
                }
              </span>
            </Col>
            <Col span={1}>市</Col>
          </Row>
        </Form.Item>

        <Form.Item label="出差事由">
          {
            this.props.form.getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: '事由不能为空',
                },
              ],
            })(
              <TextArea rows={6}/>
            )
          }
        </Form.Item>

        <Form.Item label="酒店预算">
          {
            this.props.form.getFieldDecorator('hotelBudget', {
              rules: [
                {
                  required: true,
                  message: '酒店预算不能为空',
                },
              ],
            })(
              <InputMoneyAmount/>
            )
          }
        </Form.Item>

        <Form.Item label="车旅预算">
          {
            this.props.form.getFieldDecorator('vehicleBudget', {
              rules: [
                {
                  required: true,
                  message: '车旅预算不能为空',
                },
              ],
            })(
              <InputMoneyAmount/>
            )
          }
        </Form.Item>

        <Form.Item label="饮食预算">
          {
            this.props.form.getFieldDecorator('foodBudget', {
              rules: [
                {
                  required: true,
                  message: '饮食预算不能为空',
                },
              ],
            })(
              <InputMoneyAmount/>
            )
          }
        </Form.Item>

        <Form.Item label="其他预算">
          {
            this.props.form.getFieldDecorator('otherBudget', {
              rules: [
                {
                  required: true,
                  message: '其他预算不能为空',
                },
              ],
            })(
              <InputMoneyAmount/>
            )
          }
        </Form.Item>

        <Form.Item { ...tailItemLayout }>
          <Button
            type="primary"
            htmlType="submit">
            提交出差申请
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const TravelApplyCreateForm = Form.create<TravelApplyCreateFormProps>({ name: 'travelApplyCreate' })(TravelApplyCreateFormProto)
