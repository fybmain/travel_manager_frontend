import React from 'react';
import { Button, Table, Row, Col } from 'antd';
import { ApplyStatus } from '../Models/AllModels';

import history from '../history';

const { Column } = Table;

const data1 = [
  {
    id: "4",
    key: "4",
    name: "周东",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "10",
    name: "周东",
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

export class TravelApplyListPage extends React.Component {
  handleCreate = (e: React.MouseEvent) => {
    history.push('/travel-apply/create');
  }
  
  render() {
    return (
      <div className="tablePage">
        <br/><br/>
        { table2() }
        <Row>
          <Col span={11}></Col>
          <Col span={2}>
            <Button onClick={this.handleCreate} type="primary">提交申请</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
