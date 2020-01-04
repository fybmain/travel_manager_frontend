import React from 'react';
import { Table, Button, Radio, Pagination } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { ApplyStatus, ApplyBaseInfo, FinishStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';
import { ReimbursementApi } from '../api/ReimbursementApi';

const { Column } = Table;
const radioValues = ["未报销", "审核中", "已审批"];
const pageSize = 8;
interface ReimbursementApplyListPageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApplyListPage extends React.Component<ReimbursementApplyListPageProps> {

  @observable showFinished: number = 0;
  @observable data: ApplyBaseInfo[] = [];
  @observable current: number = 1;
  @observable total: number = 1;
  @observable loadingStatus = false;

  constructor(props: ReimbursementApplyListPageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["申请", "报销申请"];
    this.updateData();
  }

  render() {
    return (
      <div className="tablePage">
        <div className="floatLeft">
          <Radio.Group value={this.showFinished} onChange={this.handleChange}>
            <Radio.Button value={0}>{radioValues[0]}</Radio.Button>
            <Radio.Button value={1}>{radioValues[1]}</Radio.Button>
            <Radio.Button value={2}>{radioValues[2]}</Radio.Button>
          </Radio.Group>
        </div>
        {(this.showFinished === 0) ? this.travelTable(this.data, this.loadingStatus) : this.reimbursementTable(this.data, this.loadingStatus)}
      </div>
    );
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = e.target.value;
    this.current = 1;
    this.total = 1;
    this.updateData();
  }


  updateData = async () => {
    this.data = [];
    this.loadingStatus = true;
    if (this.showFinished === 0) {
      const result = await ReimbursementApi.getUnpaidTravelApplyList({
        page: this.current,
        size: pageSize,
      });
      if (result.message === "ok") {
        this.data = result.items as ApplyBaseInfo[];
        this.total = result.total as number;
      }
      else {
        alert(result.message);
      }
    } else {
      const result = await ReimbursementApi.getMyReimbursementApplyList({
        page: this.current,
        size: pageSize,
        state: FinishStatus[this.showFinished - 1],
      });
      if (result.message === "ok") {
        this.data = result.items as ApplyBaseInfo[];
        this.total = result.total as number;
      }
      else {
        alert(result.message);
      }
    }
    this.loadingStatus = false;
  }

  handleDoubleClick = (applyId: number) => {
    history.push(`/reimbursement/detail?applyId=${applyId}`);
  }

  travelTable = (data: ApplyBaseInfo[], loadingStatus: boolean) => {
    return (
      <div>
        <Table dataSource={data} className="table" size="middle" loading={loadingStatus}
          rowKey={(record, index) => { return index.toString() }} pagination={false}>
          <Column title="申请人" dataIndex="applicantName" key="applicantName" />
          <Column title="申请ID" dataIndex="applyId" key="applyId" />
          <Column title="申请时间" dataIndex="applyTime" key="applyTime" />
          <Column title="部门" dataIndex="departmentName" key="departmentName" />
          <Column
            title="Action"
            key="action"
            render={(text, record, index) => (
              <Button onClick={() => { this.handleCreate(data[index].applyId); }} type="primary">提交报销申请</Button>
            )}
          />
        </Table>
        <Pagination defaultCurrent={1} total={this.total} pageSize={pageSize} className="pagination"
          hideOnSinglePage={true}
          onChange={(page, size) => {
            this.current = page; this.updateData();
          }} />
      </div>
    );
  }

  handleCreate = (applyId: number) => {
    history.push(`/reimbursement-apply/create?applyId=${applyId}`);
  }

  reimbursementTable = (data: ApplyBaseInfo[], loadingStatus: boolean) => {
    return (
      <div>
        <Table dataSource={data} className="table" size="middle" loading={loadingStatus}
          rowKey={(record, index) => { return index.toString() }} pagination={false}
          onRow={(record, rowKey) => {
            return {
              onDoubleClick: event => { this.handleDoubleClick(record.applyId) },
            };
          }}>
          <Column title="申请人" dataIndex="applicantName" key="applicantName" />
          <Column title="申请ID" dataIndex="applyId" key="applyId" />
          <Column title="申请时间" dataIndex="applyTime" key="applyTime" />
          <Column title="部门" dataIndex="departmentName" key="departmentName" />
          <Column title="申请状态" dataIndex="status" key="status"
            render={(text: number, record, index) => { return <span>{(ApplyStatus[text])}</span> }}
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
