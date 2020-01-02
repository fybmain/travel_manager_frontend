import React from 'react';
import { Button, Table, Row, Col, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
import { ApplyStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';

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
  {
    id: "4",
    key: "11",
    name: "周东",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "12",
    name: "周东",
    applyTIme:"2019-12-28 10:01:02",
    applyStatus:ApplyStatus[0],
  },
  {
    id: "4",
    key: "13",
    name: "周东",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "104",
    name: "周东",
    applyTIme:"2019-12-28 10:01:02",
    applyStatus:ApplyStatus[0],
  },
  {
    id: "4",
    key: "44",
    name: "周东",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "106",
    name: "周东",
    applyTIme:"2019-12-28 10:01:02",
    applyStatus:ApplyStatus[0],
  },
  {
    id: "4",
    key: "444",
    name: "周东",
    applyTIme:"2019-05-10 10:55:23",
    applyStatus:ApplyStatus[3],
  },
  {
    id: "10",
    key: "105",
    name: "周东",
    applyTIme:"2019-12-28 10:01:02",
    applyStatus:ApplyStatus[0],
  },
];

const table2=()=>{
  return(
    <Table dataSource={data1} className="table" size="middle">
      <Column title="申请ID" dataIndex="id" key="id" />
      <Column title="申请人" dataIndex="name" key="name" />
      <Column title="申请时间" dataIndex="applyTIme" key="applyTIme" />
      <Column title="申请状态" dataIndex="applyStatus" key="applyStatus" />
    </Table>
  );
}

interface TravelApplyListPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class TravelApplyListPage extends React.Component<TravelApplyListPageProps> {
  @observable showFinished: boolean = false;

  constructor(props:TravelApplyListPageProps){
    super(props);
    this.props.mainStore.breadcrumb=["申请", "出差申请"];
  }

  handleCreate = (e: React.MouseEvent) => {
    history.push('/travel-apply/create');
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = !(this.showFinished);
  }
  
  render() {
    return (
      <div className="tablePage">
        <div className="floatLeft">
          <br />
          <Radio.Group value={this.showFinished} onChange={this.handleChange}>
            <Radio.Button value={false}>未完成</Radio.Button>
            <Radio.Button value={true}>已完成</Radio.Button>
          </Radio.Group>
        </div>
        { table2() }
        <Row style={{paddingBottom: 20}}>
          <Col span={11}></Col>
          <Col span={2}>
            <Button onClick={this.handleCreate} type="primary">提交申请</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
