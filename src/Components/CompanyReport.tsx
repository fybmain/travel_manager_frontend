import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../Stores/MainStore';

interface CompanyReportProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class CompanyReport extends React.Component<CompanyReportProps> {
  constructor(props: CompanyReportProps) {
    super(props);
    this.props.mainStore.breadcrumb=["统计", "公司报表"];
  }

  render() {
    return (
      <h1>This is CompanyReport page</h1>
    );
  }
}