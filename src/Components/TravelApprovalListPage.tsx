import React from 'react';
import { Table, Radio, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { TravelApplyItem, TravelApplyStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';
import { TravelApplyApi } from '../api/TravelApplyApi';

const { Column } = Table;

interface TravelApprovalListPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class TravelApprovalListPage extends React.Component<TravelApprovalListPageProps> {
  @observable showApproved: boolean = false;
  @observable loading: boolean = true;
  @observable data: undefined|(TravelApplyItem[]) = undefined;
  @observable total: number = 0;

  constructor(props:TravelApprovalListPageProps){
    super(props);
    this.props.mainStore.breadcrumb=["审批", "出差审批"];
    this.refreshData();
  }

  handleOpenDetail = (applyId: number) => {
    history.push(`/travel-approval/${applyId}/detail`);
  }
  
  handleChange = (e: RadioChangeEvent) => {
    this.showApproved = !(this.showApproved);
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    this.doRefreshData().then(() => {
      this.loading = false;
    })
  }

  renderDate(text: Date): string {
    return `${text.getFullYear()}年${text.getMonth()+1}月${text.getDay()}日`;
  }

  renderStatus(text: TravelApplyStatus) {
    switch(text){
      case TravelApplyStatus.NeedDepartmentManagerApproval:
        return '待部门经理审批';
      case TravelApplyStatus.NeedGeneralManagerApproval:
        return '待总经理审批';
      case TravelApplyStatus.ApplicationApproved:
        return '审批通过';
      case TravelApplyStatus.ApplicationNotApproved:
        return '审批不通过';
    };
  }

  async doRefreshData() {
    const requestState = (this.showApproved)?"finished":"unfinished";
    const result = await TravelApplyApi.getTravelApplicationListForApprover(10, 1, requestState);
    if(result.message==="ok"){
      this.data = result.items;
      this.total = result.total;
    }else{
      message.error(result.message);
    }
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
        <Table
          loading={this.loading}
          dataSource={this.data}
          rowKey="applyId"
          onRow={record => ({ onDoubleClick: () => this.handleOpenDetail(record.applyId) })}
          className="table"
          size="middle">
          <Column title="申请编号" dataIndex="applyId" key="applyId" />
          <Column title="申请人" dataIndex="applicantName" key="applicantName" />
          <Column title="申请时间" dataIndex="applyTime" key="applyTime" render={this.renderDate}/>
          <Column title="申请状态" dataIndex="status" key="status" render={this.renderStatus}/>
        </Table>
      </div>
    );
  }
}
