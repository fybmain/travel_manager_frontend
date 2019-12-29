import React, { Component } from 'react';
import Column from 'antd/lib/table/Column';
import { ApplyStatus } from '../Models/AllModels';

import { Table, Form, Input, Button, DatePicker } from 'antd';
import { InputMoneyAmount } from './InputMoneyAmount';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export class TravelApplyCreatePage extends Component {
  
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
      <div>
        <div className="tablePage">
          <br/><br/>
          {table2()}
          <div className="bottomButton">
            <Button type="primary">提交申请</Button>
          </div>
        </div>
      </div>
    );
  }
}

const data1 = [
  {
    id: "4",
    key: "4",
    name: "李四",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "10",
    name: "李四",
    applyTIme:"2019-12-28 10:01:02",
    applyStatus:ApplyStatus[0],
  },
];

const table2=()=>{
  return(
      <Table dataSource={data1} className="table">
          <Column title="申请ID" dataIndex="id" key="id" />
          <Column title="申请人" dataIndex="name" key="name" />
          <Column title="申请时间" dataIndex="applyTIme" key="applyTIme" />
          <Column title="申请状态" dataIndex="applyStatus" key="applyStatus" />
      </Table>
  );
}

