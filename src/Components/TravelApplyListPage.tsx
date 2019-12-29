import React from 'react';
import { Button, Table, Row, Col } from 'antd';

import history from '../history';

export class TravelApplyListPage extends React.Component {
  handleCreate = (e: React.MouseEvent) => {
    history.push('/travel-apply/create');
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
        time: '2019-12-25 10:00:00',
        status: '待部门经理审核',
      },
      {
        name: '张可',
        time: '2019-12-26 11:00:00',
        status: '待总经理审核',
      },
      {
        name: '张可',
        time: '2019-12-27 12:00:00',
        status: '待部门经理审核',
      },
    ];
    return (
      <div>
        <Row>
          <Button onClick={this.handleCreate} type="primary" style={{float: "right"}}>创建出差申请</Button>
        </Row>

        <Table columns={columns} dataSource={data}/>
      </div>
    );
  }
}
