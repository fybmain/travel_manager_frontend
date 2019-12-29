import React, { Component } from 'react';
import { Table } from 'antd';

export class ReimbursementApprovalPage extends Component {
  
  render() {
    const columns = [
      {
        title: '申请人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '申请状态',
        dataIndex: 'status',
        key: 'status',
      },
    ];
    const data = [
      {
        name: '张可',
        time: '2019-12-27 11:00:00',
        status: '待部门经理审核',
      },
      {
        name: '赵可',
        time: '2019-12-28 12:00:00',
        status: '待总经理审核',
      },
    ];
    return (
      <Table columns={columns} dataSource={data}/>
    );
  }
}
