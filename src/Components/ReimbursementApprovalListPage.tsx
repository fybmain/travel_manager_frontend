import React from 'react';
import { Table, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { ApplyStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';

const { Column } = Table;

interface ReimbursementApprovalListPageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApprovalListPage extends React.Component<ReimbursementApprovalListPageProps> {

  @observable showApproved: boolean = false;

  constructor(props: ReimbursementApprovalListPageProps) {
    super(props);
    this.props.mainStore.breadcrumb=["审批","报销审批"];
  }

  render() {
    return (
      <div className="tablePage">
        <div className="floatLeft">
          <br />
          <Radio.Group value={this.showApproved} onChange={this.handleChange}>
            <Radio.Button value={false}>待审批</Radio.Button>
            <Radio.Button value={true}>已审批</Radio.Button>
          </Radio.Group>
        </div>
        { table2(this.showApproved) }
      </div>
    );
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showApproved = !this.showApproved;
  }
}


const data1 = [
  {
    id: "4",
    key: "4",
    name: "李可",
    applyTIme: "2018-05-10 10:55:23",
    applyStatus: ApplyStatus[2],
  },
  {
    id: "9",
    key: "9",
    name: "陈可",
    applyTIme: "2018-12-20 10:01:02",
    applyStatus: ApplyStatus[2],
  },
  {
    id: "13",
    key: "13",
    name: "周北",
    applyTIme: "2018-12-30 08:01:02",
    applyStatus: ApplyStatus[1],
  },
  {
    id: "9",
    key: "9",
    name: "周西",
    applyTIme: "2019-12-20 10:01:02",
    applyStatus: ApplyStatus[0],
  },
  {
    id: "13",
    key: "13",
    name: "周北",
    applyTIme: "2019-12-30 08:01:02",
    applyStatus: ApplyStatus[0],
  },
];

const table2 = (showApproved: boolean) => {
  const data2 = showApproved ?
    data1.filter(x => x.applyStatus !== ApplyStatus[0])
    : data1.filter(x => x.applyStatus === ApplyStatus[0])
  return (
    <Table dataSource={data2} className="table"
      onRow={record => {
        return {
          onDoubleClick: event => {handleDetail()},
        };
      }}
    >
      <Column title="申请ID" dataIndex="id" key="id" />
      <Column title="申请人" dataIndex="name" key="name" />
      <Column title="申请时间" dataIndex="applyTIme" key="applyTIme" />
      <Column title="申请状态" dataIndex="applyStatus" key="applyStatus" />
    </Table>
  );
}

const handleDetail = () => {
  history.push('/reimbursement-approval/detail');
}

