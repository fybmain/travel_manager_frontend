import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { inject, observer } from 'mobx-react';

import { InputMoneyAmount } from './InputMoneyAmount';
import { MainStore } from '../Stores/MainStore';

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
    return (
      <div className="tablePage">
        <div style={{paddingTop: "50px"}}/>

        <Form { ...formItemLayout } layout="horizontal">
          <Form.Item label="申请人">
            <Input disabled={true} value="张可"/>
          </Form.Item>

          <Form.Item label="出差时间">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item label="出差地点">
            <Input></Input>
          </Form.Item>

          <Form.Item label="出差事由">
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item label="酒店预算">
           <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="车旅预算">
           <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="饮食预算">
            <InputMoneyAmount />
          </Form.Item>

          <Form.Item label="其他预算">
            <InputMoneyAmount />
          </Form.Item>

          <Form.Item { ...tailItemLayout }>
            <Button type="primary" htmlType="submit">
              提交出差申请
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
