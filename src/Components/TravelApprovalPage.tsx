import React, { Component } from 'react';
import { Table } from 'antd';

export class TravelApprovalPage extends Component {
  
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
        time: '2019-12-24 10:00:00',
        status: '待部门经理审核',
      },
      {
        name: '赵可',
        time: '2019-12-25 11:00:00',
        status: '待总经理审核',
      },
      {
        name: '钱可',
        time: '2019-12-26 12:00:00',
        status: '待部门经理审核',
      },
      {
        name: '孙可',
        time: '2019-12-27 13:00:00',
        status: '审核通过',
      },
      {
        name: '李可',
        time: '2019-12-28 14:00:00',
        status: '审核未通过',
      },
    ];
    return (
      <div className="tablePage">
        <Table columns={columns} dataSource={data}/>
      </div>
    );
  }
}
