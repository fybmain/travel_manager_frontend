import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../../Stores/MainStore';
import { DepartmentPercentileChart } from './DepartmentPercentileChart';
import { CostChangeChart } from './CostChangeChart';

interface CompanyReportProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class CompanyReport extends React.Component<CompanyReportProps> {
  constructor(props: CompanyReportProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["统计", "公司报表"];
  }

  render() {
    return (
      <div className="card-margin">
        <CostChangeChart mainStore={this.props.mainStore} />
        <br/><br/><br/>
        <DepartmentPercentileChart />
      </div>
    );
  }
}