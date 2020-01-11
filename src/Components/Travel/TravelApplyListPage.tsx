import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Table, Row, Col, Radio, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../../history';
import { TravelApplyItem, travelApplyStatusToString, renderDate } from '../../Models';
import { MainStore } from '../../Stores/MainStore';
import { TravelApplyApi } from '../../api/TravelApplyApi';

const { Column } = Table;

interface TravelApplyListPageProps extends RouteComponentProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class TravelApplyListPage extends React.Component<TravelApplyListPageProps> {
  @observable showFinished: boolean = false;
  @observable loading: boolean = true;
  @observable total: number = 0;
  @observable pageSize: number = 8;
  @observable pageNumber: number = 1;
  @observable data: undefined|(TravelApplyItem[]) = undefined;

  constructor(props: TravelApplyListPageProps){
    super(props);
    this.props.mainStore.breadcrumb=["申请", "出差申请"];
    this.refreshData();
  }

  handleChange = (e: RadioChangeEvent) => {
    this.showFinished = !(this.showFinished);
    this.pageNumber = 1;
    this.refreshData();
  }

  handleSwitchPage = (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.refreshData();
  }

  handleOpenDetail = (applyId: number) => {
    history.push(`/travel-apply/${applyId}/detail`);
  }

  handleCreate = (e: React.MouseEvent) => {
    history.push('/travel-apply/create');
  }

  refreshData() {
    this.loading = true;
    this.doRefreshData().then(() => {
      this.loading = false;
    })
  }

  async doRefreshData() {
    const requestState = (this.showFinished)?"finished":"unfinished";
    const result = await TravelApplyApi.getTravelApplicationListForUser(this.pageSize, this.pageNumber, requestState);
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
          <Radio.Group value={this.showFinished} onChange={this.handleChange}>
            <Radio.Button value={false}>未完成</Radio.Button>
            <Radio.Button value={true}>已完成</Radio.Button>
          </Radio.Group>
          <Button
            onClick={this.handleCreate}
            icon="file-add"
            shape="round"
            type="primary"
            htmlType="button"
            style={{ marginLeft: "2%" }}>
            提交新的申请
          </Button>
        </div>
        {
          <Table
            loading={this.loading}
            dataSource={this.data}
            onRow={record => ({ onDoubleClick: () => this.handleOpenDetail(record.applyId) })}
            rowKey={(record, index) => { return index.toString() }} 
            className="table"
            size="middle"
            pagination={{
              total: this.total,
              pageSize: this.pageSize,
              current: this.pageNumber,
              onChange: this.handleSwitchPage,
              hideOnSinglePage: true,
              className: "pagination",
            }}>
            <Column title="申请编号" dataIndex="applyId" key="applyId" />
            <Column title="申请人" dataIndex="applicantName" key="applicantName" />
            <Column title="申请时间" dataIndex="applyTime" key="applyTime" render={renderDate} />
            <Column title="申请状态" dataIndex="status" key="status" render={travelApplyStatusToString}/>
            <Column title="详情" render={(text, record: TravelApplyItem) => {
              return <Link to={`/travel-apply/${record.applyId}/detail`}>查看详情</Link>;
            }}/>
          </Table>
        }

        <Row style={{paddingBottom: 20}}/>
      </div>
    );
  }
}
