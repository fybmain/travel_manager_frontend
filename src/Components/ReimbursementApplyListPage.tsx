import React from 'react';
import { Table, Button, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { ApplyStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';

const { Column } = Table;

interface ReimbursementApplyListPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApplyListPage extends React.Component<ReimbursementApplyListPageProps> {
  
  @observable showPendingReview:boolean = true;

  constructor(props: ReimbursementApplyListPageProps) {
    super(props);
    this.props.mainStore.breadcrumb=["申请", "报销申请"];
  }

  render() {
    return (
      <div className="tablePage">
        <div  className="floatLeft">
          <br/>
          <Radio.Group value={this.showPendingReview} onChange={this.handleChange}>
            <Radio.Button value={false}>已报销</Radio.Button>
            <Radio.Button value={true}>未报销</Radio.Button>
          </Radio.Group>
        </div>
        {this.showData(this.showPendingReview)}
      </div>
    );
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showPendingReview = !this.showPendingReview;
  }

  showData=(showPendingReview:boolean)=>{
      return (showPendingReview?
          <div>{table2()}</div>
      :<div>{table3()}</div>)
  }
}


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
    applyTIme:"2019-12-20 10:01:02",
    applyStatus:ApplyStatus[2],
  },
  {
    id: "12",
    key: "12",
    name: "周东",
    applyTIme:"2019-12-30 08:01:02",
    applyStatus:ApplyStatus[1],
  },
];

const table2=()=>{
  return(
    <Table dataSource={data1} className="table">
      <Column title="申请ID" dataIndex="id" key="id" />
      <Column title="申请人" dataIndex="name" key="name" />
      <Column title="申请时间" dataIndex="applyTIme" key="applyTIme" />
      <Column
        title="详情"
        key="action"
        render={(text, record) => (
          <Button onClick={handleCreate} type="primary">提交报销申请</Button>
        )}
        />
    </Table>
  );
}

const  handleCreate = (e: React.MouseEvent) => {
  history.push('/reimbursement-apply/create');
}

const table3=()=>{
  return(
    <Table dataSource={data1} className="table">
      <Column title="申请ID" dataIndex="id" key="id" />
      <Column title="申请人" dataIndex="name" key="name" />
      <Column title="申请时间" dataIndex="applyTIme" key="applyTIme" />
      <Column title="申请状态" dataIndex="applyStatus" key="applyStatus" />
    </Table>
  );
}
