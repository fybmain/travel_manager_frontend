import React from 'react';
import { Table, Radio, Pagination } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { ApplyStatus, ApplyBaseInfo, FinishStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';
import { ReimbursementApi } from '../api/ReimbursementApi';

const { Column } = Table;
const radioValues = ["待审批", "已审批"];
const pageSize = 8;
interface ReimbursementApprovalListPageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApprovalListPage extends React.Component<ReimbursementApprovalListPageProps> {

  @observable showFinished: number = 0;
  @observable data: ApplyBaseInfo[] = [];
  @observable current: number = 1;
  @observable total: number = 1;
  @observable loadingStatus = false;
  @observable departmentId = -1;

  constructor(props: ReimbursementApprovalListPageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["审批", "报销审批"];
    this.updateData();
  }

  render() {
    return (
      <div className="tablePage">
        <div className="floatLeft">
          <Radio.Group value={this.showFinished} onChange={this.handleChange}>
            <Radio.Button value={0}>{radioValues[0]}</Radio.Button>
            <Radio.Button value={1}>{radioValues[1]}</Radio.Button>
          </Radio.Group>
        </div>
        {this.reimbursementTable(this.data, this.loadingStatus)}
      </div>
    );
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = e.target.value;
    this.current=1;
    this.total=1;
    this.updateData();
  }


  updateData = async () => {
    this.data = [];
    this.loadingStatus = true;
    const result = await ReimbursementApi.getReimbursementApplyList({
      page: this.current,
      size: pageSize,
      state: FinishStatus[this.showFinished],
      departmentId: -1,
    });
    if (result.message === "ok") {
      this.data = result.items as ApplyBaseInfo[];
      this.total = result.total as number;
    }
    else {
      alert(result.message);
    }
    this.loadingStatus = false;
  }

  handleDoubleClick = (applyId:number) => {
    history.push(`/reimbursement-approval/detail?applyId=${applyId}`);
  }

  reimbursementTable = (data: ApplyBaseInfo[], loadingStatus: boolean) => {
    return (
      <div style={{ padding: '20px' }}>
        <Table dataSource={data} className="table" size="middle" loading={loadingStatus}
          rowKey={(record, index) => { return index.toString() }} pagination={false}
          onRow={(record,rowKey) => {
            return {
              onDoubleClick: event => {this.handleDoubleClick(record.applyId)},
            };
          }}>
          <Column title="申请人" dataIndex="applicantName" key="applicantName" />
          <Column title="申请ID" dataIndex="applyId" key="applyId" />
          <Column title="申请时间" dataIndex="applyTime" key="applyTime" />
          <Column title="部门" dataIndex="departmentName" key="departmentName" />
          <Column title="申请状态" dataIndex="status" key="status"
            render={(text:number, record, index) => { return <span>{(ApplyStatus[text])}</span> }}
          />
        </Table>
        <Pagination current={this.current} total={this.total} pageSize={pageSize}
          hideOnSinglePage={true}
          onChange={(page, size) => {
            this.current = page; this.updateData();
          }} />
      </div>
    );
  }
}
