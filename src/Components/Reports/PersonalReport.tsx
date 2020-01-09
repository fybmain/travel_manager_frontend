import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../../Stores/MainStore';
import { PersonChart } from './PersionChart';

interface PersonalReportProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class PersonalReport extends React.Component<PersonalReportProps> {

  constructor(props: PersonalReportProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["统计", "个人报表"];
  }

  render() {
    return (
      <div className="card-margin">
        <PersonChart mainStore={this.props.mainStore}/>
      </div>
    );
  }
}