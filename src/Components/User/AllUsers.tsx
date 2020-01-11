import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Select, Table, Divider, Radio, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import '../../App.css';
import { AdminListUserItem, UserRole } from '../../Models';
import { UserAdminApi } from '../../api/UserAdminApi';
import { MainStore } from '../../Stores/MainStore';
import DepartmentInfoStore from '../../Stores/DepartmentInfoStore';

const { Column } = Table;
const { Option } = Select;

interface AllUsersProps extends RouteComponentProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
class AllUsers extends React.Component<AllUsersProps> {

  @observable showApproved: boolean = false;
  @observable loading: boolean = true;
  @observable total: number = 0;
  @observable pageSize: number = 8;
  @observable pageNumber: number = 1;
  @observable data: AdminListUserItem[] = [];

  constructor(props: AllUsersProps) {
    super(props);
    this.props.mainStore.breadcrumb=["管理后台", "用户信息"];
    DepartmentInfoStore.refreshData().then(() => {this.forceUpdate();});
    this.refreshData();
  }
  
  handleChange = (e: RadioChangeEvent) => {
    this.showApproved = !this.showApproved;
    this.pageNumber = 1;
    this.refreshData();
  }


  handleSwitchPage = (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.refreshData();
  }

  handleUpdateDepartment = (value: number, record: AdminListUserItem) => {
    UserAdminApi.updateUserDepartment(record.id, value).then(
      (result) => {
        if(result.message==="ok"){
          message.success("修改成功");
          record.departmentId = value;
          record.departmentName = DepartmentInfoStore.getDepartmentName(value);
          this.forceUpdate();
        }else{
          message.error(result.message);
        }
      }
    )
  }

  handleUpdateRole = (value: UserRole, record: AdminListUserItem) => {
    UserAdminApi.updateUserRole(record.id, value).then(
      (result) => {
        if(result.message==="ok"){
          message.success("修改成功");
          record.role = value;
          this.forceUpdate();
        }else{
          message.error(result.message);
        }
      }
    )
  }

  handleSetApprovalStatus = (record: AdminListUserItem, approve: boolean) => {
    UserAdminApi.setUserApprovalStatus(record.id, approve).then(
      (result) => {
        if(result.message==="ok"){
          message.success("审核成功");
          this.data.splice(this.data.indexOf(record), 1);
          this.forceUpdate();
        }else{
          message.error(result.message);
        }
      }
    )
  }

  refreshData() {
    this.loading = true;
    this.doRefreshData().then(() => {
      this.loading = false;
    })
  }

  async doRefreshData() {
    const result = await UserAdminApi.getUserList(this.pageSize, this.pageNumber, this.showApproved);
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
            <Radio.Button value={false}>待审核</Radio.Button>
            <Radio.Button value={true}>已审核</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          loading={this.loading}
          dataSource={this.data}
          rowKey="id"
          size="middle"
          className="table"
          pagination={{
            total: this.total,
            pageSize: this.pageSize,
            current: this.pageNumber,
            onChange: this.handleSwitchPage,
            hideOnSinglePage: true,
            className: "pagination",
          }}>

          <Column title="用户ID" dataIndex="id" key="id" />
          <Column title="工号" dataIndex="workId" key="workId" />
          <Column title="姓名" dataIndex="name" key="name" />
          <Column title="邮箱" dataIndex="email" key="email" />
          <Column title="手机号" dataIndex="telephone" key="telephone" />
          <Column
            title="部门"
            dataIndex="departmentId"
            key="departmentId"
            render={(text, record: AdminListUserItem) => (
              <span>
                <Select
                  value={text}
                  onChange={(value: UserRole) => {this.handleUpdateDepartment(value, record)}}
                  style={{ minWidth: 120 }}>
                  {
                    DepartmentInfoStore.departmentList.map(
                      ({id, name}) => (
                        <Option value={id} key={id}>{name}</Option>
                      )
                    )
                  }
                </Select>
              </span>
            )}/>
          <Column
            title="角色"
            dataIndex="role"
            key="role"
            render={(text, record: AdminListUserItem) => (text===UserRole.Admin)?(
              "管理员"
            ):(
              <span>
                <Select
                  value={text}
                  onChange={(value: UserRole) => {this.handleUpdateRole(value, record)}}
                  style={{ width: 120 }}>
                  <Option value={UserRole.Employee}>员工</Option>
                  <Option value={UserRole.DepartmentManager}>部门经理</Option>
                  <Option value={UserRole.GeneralManager}>总经理</Option>
                </Select>
              </span>
            )}/>
          {
            (this.showApproved)?null:(
              <Column
                title="Action"
                key="action"
                render={(text, record: AdminListUserItem) => (
                  <span>
                  <button
                    onClick={() => {this.handleSetApprovalStatus(record, true)}}
                    type="button"
                    className="button-like-link">
                    Pass
                  </button>
                  <Divider type="vertical" />
                  <button
                    onClick={() => {this.handleSetApprovalStatus(record, false)}}
                    type="button"
                    className="button-like-link">
                    Delete
                  </button>
                  </span>
                )}/>
            )
          }
        </Table>
      </div>
    );
  }
}

export default withRouter(AllUsers as any);
