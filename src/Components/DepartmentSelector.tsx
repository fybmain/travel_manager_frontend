import React from 'react';
import { Select } from 'antd';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { DepartmentInfo } from '../Models';
import DepartmentInfoStore from '../Stores/DepartmentInfoStore';
import UserInfoStore from '../Stores/UserInfoStore';

const { Option } = Select;

interface DepartmentSelectorProps {
  changeSelect: (id: number) => void;
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
      <span>
        {
          UserInfoStore.userInfo.role === 2 ?
            <span>
              <label>&nbsp;&nbsp;&nbsp;部门：</label>
              <Select value={this.departmentId}
                style={{ width: 180 }}
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
        }</span>
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
