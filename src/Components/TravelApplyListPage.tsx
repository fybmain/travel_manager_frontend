import React from 'react';
import { Button, Table, Row, Col, Radio, message, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
import { TravelApplyItem, TravelApplyStatus } from '../Models/AllModels';
import { MainStore } from '../Stores/MainStore';
import { TravelApplyApi } from '../api/TravelApplyApi';

const { Column } = Table;

interface TravelApplyListPageProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class TravelApplyListPage extends React.Component<TravelApplyListPageProps> {
  @observable showFinished: boolean = false;
  @observable loading: boolean = true;
  @observable data: undefined|(TravelApplyItem[]) = undefined;
  @observable total: number = 0;

  constructor(props:TravelApplyListPageProps){
    super(props);
    this.props.mainStore.breadcrumb=["申请", "出差申请"];
    this.refreshData(this.showFinished);
  }

  handleCreate = (e: React.MouseEvent) => {
    history.push('/travel-apply/create');
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = !(this.showFinished);
    this.refreshData(this.showFinished);
  }

  refreshData(showFinished: boolean) {
    this.loading = true;
    this.doRefreshData(showFinished).then(() => {
      this.loading = false;
    })
  }

  async doRefreshData(showFinished: boolean) {
    const requestState = (this.showFinished)?"finished":"unfinished";
    const result = await TravelApplyApi.getTravelApplicationListForUser(10, 1, requestState);
    if(result.message==="ok"){
      this.data = result.items;
      this.total = result.total;
    }else{
      message.error(result.message);
    }
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
        {
          this.loading?(
            <Spin />
          ):(
            <Table dataSource={this.data} className="table" size="middle" rowKey="applyId">
              <Column title="申请ID" dataIndex="applyId" key="applyId" />
              <Column title="申请人" dataIndex="applicantName" key="applicantName" />
              <Column title="申请时间" dataIndex="applyTime" key="applyTime" render={this.renderDate}/>
              <Column title="申请状态" dataIndex="status" key="status" render={this.renderStatus}/>
            </Table>
          )
        }

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
