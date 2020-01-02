import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../Stores/MainStore';

interface PersonalReportProps{
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class PersonalReport extends React.Component<PersonalReportProps> {
  
  constructor(props: PersonalReportProps) {
    super(props);
    this.props.mainStore.breadcrumb=["统计", "个人报表"];
  }
  render() {
    return (
      <h1>This is PersonalReport page</h1>
    );
  }
}