import React from 'react';
import { Table, Row, Button } from 'antd';

import history from '../history';

export class ReimbursementApplyListPage extends React.Component {
  handleCreate = (e: React.MouseEvent) => {
    history.push('/reimbursement-apply/create');
  }
  
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
        time: '2019-12-27 12:00:00',
        status: '待部门经理审核',
      },
      {
        name: '张可',
        time: '2019-12-28 13:00:00',
        status: '待总经理审核',
      },
    ];
    return (
      <div>
        <Row>
          <Button onClick={this.handleCreate} type="primary" style={{float: "right"}}>创建报销申请</Button>
        </Row>
        <Table columns={columns} dataSource={data}/>
      </div>

    );
  }
}
