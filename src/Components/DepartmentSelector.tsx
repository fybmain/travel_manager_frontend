import React from 'react';
import { Table, Radio, Pagination, Select, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import history from '../history';
import { ApplyStatus, ApplyBaseInfo, FinishStatus, renderDate, DepartmentInfo } from '../Models';
import { ReimbursementApi } from '../api/ReimbursementApi';
import { MainStore } from '../Stores/MainStore';
import DepartmentInfoStore from '../Stores/DepartmentInfoStore';
import UserInfoStore from '../Stores/UserInfoStore';

const { Column } = Table;
const radioValues = ["待审批", "已审批"];
const pageSize = 8;
const { Option } = Select;
interface DepartmentSelectorProps {
  changeSelect:(id:number)=>void;
}

 @observer
export class DepartmentSelector extends React.Component<DepartmentSelectorProps> {

  @observable departmentId = -1;
  @observable allDepartment: DepartmentInfo[] = [];

  constructor(props: DepartmentSelectorProps) {
    super(props);
    this.getAllDepartment();
  }

  render() {
    return (
      <div>
          {
            UserInfoStore.userInfo.role === 2 ?
              <span>
                <label>&nbsp;&nbsp;&nbsp;部门：</label>
                <Select value={this.departmentId} 
                style={{ width: 120 }} 
                defaultValue={UserInfoStore.userInfo.departmentId}
                onChange={this.handleSelectChange} 
                key="select">
                  <Option value={-1}>All</Option>
                  {this.allDepartment.map((value: DepartmentInfo, index) =>
                    <Option value={value.id} key={value.id}>{value.name}</Option>
                  )}
                </Select>
              </span>
              : null
          }
      </div>
    );
  }

  handleSelectChange = (value: number) => {
    this.departmentId = value;
    this.props.changeSelect(value);
  }

  getAllDepartment = async () => {
    await DepartmentInfoStore.refreshData();
    this.allDepartment = DepartmentInfoStore.departmentList;
  }
}
