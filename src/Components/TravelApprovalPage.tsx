import React from 'react';
import { Table, Row, Button, Switch } from 'antd';

import history from '../history';
import { ApplyStatus } from '../Models/AllModels';
import Column from 'antd/lib/table/Column';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class TravelApprovalPage extends React.Component {

  @observable showPendingReview: boolean = true;

  render() {
    return (
      <div className="tablePage">
        <div className="floatLeft">
          <br />
          <span className="myFont">&nbsp;&nbsp;待审批 &nbsp;</span>
          <span><Switch defaultChecked onChange={this.onChange} /></span>
        </div>
        {this.showData(this.showPendingReview)}
      </div>
    );
  }

  onChange = (checked: boolean, event: MouseEvent) => {
    this.showPendingReview = !this.showPendingReview;
    console.log("click")
  }

  showData = (showPendingReview: boolean) => {
    return <div>{table2(showPendingReview)}</div>;
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

const table2 = (showPendingReview: boolean) => {
  const data2 = showPendingReview ?
    data1.filter(x => x.applyStatus == ApplyStatus[0])
    : data1.filter(x => x.applyStatus != ApplyStatus[0])
  return (
    <Table dataSource={data2} className="table"
      onRow={record => {
        return {
          onDoubleClick: event => { handleCreate() },
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

const handleCreate = () => {
  history.push('/reimbursement-apply/create');
}

