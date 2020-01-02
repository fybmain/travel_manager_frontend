import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../Stores/MainStore';

interface DepartmentReportProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class DepartmentReport extends Component<DepartmentReportProps> {

  constructor(props: DepartmentReportProps) {
    super(props);
    this.props.mainStore.breadcrumb=["统计", "部门报表"];
  }
  render() {
    return (
      <h1>This is DepartmentReport page</h1>
    );
  }
}