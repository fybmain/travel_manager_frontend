import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Radio, Select, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../../history';
import { ApplyStatus, ApplyBaseInfo, FinishStatus, renderDate, DepartmentInfo } from '../../Models';
import { ReimbursementApi } from '../../api/ReimbursementApi';
import { MainStore } from '../../Stores/MainStore';
import DepartmentInfoStore from '../../Stores/DepartmentInfoStore';
import UserInfoStore from '../../Stores/UserInfoStore';

const { Column } = Table;
const radioValues = ["待审批", "已审批"];
const pageSize = 8;
const { Option } = Select;
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
  @observable allDepartment: DepartmentInfo[] = [];

  constructor(props: ReimbursementApprovalListPageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["审批", "报销审批"];
    this.getAllDepartment();
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
          {
            UserInfoStore.userInfo.role === 2 ?
              <span>
                <label>&nbsp;&nbsp;&nbsp;部门：</label>
                <Select value={this.departmentId} style={{ width: 120 }} onChange={this.handleSelectChange} key="select">
                  <Option value={-1}>All</Option>
                  {this.allDepartment.map((value: DepartmentInfo, index) =>
                    <Option value={value.id} key={value.id}>{value.name}</Option>
                  )}
                </Select>
              </span>
              : null
          }

        </div>
        {this.reimbursementTable(this.data, this.loadingStatus)}
      </div>
    );
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = e.target.value;
    this.current = 1;
    this.total = 1;
    this.updateData();
  }

  handleSelectChange = (value: number) => {
    this.departmentId = value;
    this.current = 1;
    this.total = 1;
    this.updateData();
  }

  getAllDepartment = async () => {
    await DepartmentInfoStore.refreshData();
    this.allDepartment = DepartmentInfoStore.departmentList;
  }

  updateData = async () => {
    this.data = [];
    this.loadingStatus = true;
    const result = await ReimbursementApi.getReimbursementApplyList({
      page: this.current,
      size: pageSize,
      state: FinishStatus[this.showFinished],
      departmentId: this.departmentId,
    });
    if (result.message === "ok") {
      this.data = result.items as ApplyBaseInfo[];
      this.total = result.total as number;
    }
    else {
      message.error(result.message);
    }
    this.loadingStatus = false;
  }

  handleDoubleClick = (applyId: number) => {
    if (this.showFinished === 0) {
      history.push(`/reimbursement-approval/approval?applyId=${applyId}`);
    } else {
      history.push(`/reimbursement/detail?applyId=${applyId}`);
    }
  }

  reimbursementTable = (data: ApplyBaseInfo[], loadingStatus: boolean) => {
    return (
      <div style={{ padding: '20px' }}>
        <Table
          loading={loadingStatus}
          dataSource={data}
          className="table"
          size="middle"
          rowKey={(record, index) => { return index.toString() }}
          onRow={(record, rowKey) => {
            return {
              onDoubleClick: event => { this.handleDoubleClick(record.applyId) },
            };
          }}
          pagination={{
            current: this.current,
            total: this.total,
            pageSize: pageSize,
            hideOnSinglePage: true,
            onChange: (page, size) => {
              this.current = page; this.updateData();
            }
          }}>
          <Column title="申请人" dataIndex="applicantName" key="applicantName" />
          <Column title="申请ID" dataIndex="applyId" key="applyId" />
          <Column title="申请时间" dataIndex="applyTime" key="applyTime" render={(text) => renderDate(new Date(text))} />
          <Column title="部门" dataIndex="departmentName" key="departmentName" />
          <Column title="申请状态" dataIndex="status" key="status"
            render={(text: number, record, index) => { return <span>{(ApplyStatus[text])}</span> }}
          />
          <Column title="详情" render={(text, record: ApplyBaseInfo) => {
            if (this.showFinished === 0) {
              return <Link to={`/reimbursement-approval/approval?applyId=${record.applyId}`}>查看详情</Link>;
            } else {
              return <Link to={`/reimbursement/detail?applyId=${record.applyId}`}>查看详情</Link>;
            }
          }}/>
        </Table>
      </div>
    );
  }
}
