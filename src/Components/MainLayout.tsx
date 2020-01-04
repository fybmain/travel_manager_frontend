import { Layout, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import '../App.css';

import { Home } from './Home';
import { TravelApplyListPage } from './TravelApplyListPage';
import { TravelApplyCreatePage } from './TravelApplyCreatePage';
import { ReimbursementApplyListPage } from './ReimbursementApplyListPage';
import { ReimbursementApplyCreatePage } from './ReimbursementApplyCreatePage';
import { TravelApprovalListPage } from './TravelApprovalListPage';
import { TravelApprovalDetailPage } from './TravelApprovalDetailPage';
import { ReimbursementApprovalListPage } from './ReimbursementApprovalListPage';
import { ReimbursementDetailPage } from './ReimbursementDetailPage';

import { PersonalReport } from './PersonalReport';
import { DepartmentReport } from './DepartmentReport';
import { CompanyReport } from './CompanyReport';

import UserInfoPage from './UserInfoPage';
import { UserInfoEditPage } from './UserInfoEditPage';
import { UserPasswordEditPage } from './UserPasswordEditPage';


import AllUsers from './AllUsers';
import { MainStore } from '../Stores/MainStore';
import { MainMenu } from './MainMenu';
import { UserStateMenu } from './UserStateMenu';

const { Header, Content, Sider } = Layout;

interface props extends RouteComponentProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
class MainLayout extends Component<props, {}> {
  /*
  constructor(props: any) {
    super(props);
  }
  */

  render() {
    return (
      <div>
        <Layout>
          <Sider width={300} style={{ background: '#fff' }}>
            <MainMenu/>
          </Sider>
          <Content>
            <Layout style={{ padding: '0 24px 24px', position: "fixed", top: 64, left: 300, right: 0, bottom: 0, overflowY: "auto" }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {
                  this.props.mainStore.breadcrumb.map((value, index) => <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>)
                }
              </Breadcrumb>
              <Switch>
                <Route exact path="/home" component={Home} />

                <Route exact path="/travel-apply" component={TravelApplyListPage} />
                <Route exact path="/travel-apply/create" component={TravelApplyCreatePage} />

                <Route exact path="/reimbursement-apply" component={ReimbursementApplyListPage} />
                <Route exact path="/reimbursement-apply/create" component={ReimbursementApplyCreatePage} />

                <Route exact path="/travel-approval" component={TravelApprovalListPage} />
                <Route exact path="/travel-approval/:applyId/detail" component={TravelApprovalDetailPage} />

                <Route exact path="/reimbursement-approval" component={ReimbursementApprovalListPage} />
                <Route exact path="/reimbursement/detail" component={ReimbursementDetailPage} />
                <Route exact path="/reimbursement-approval/approval" component={ReimbursementDetailPage} />

                <Route exact path="/personal-report" component={PersonalReport} />
                <Route exact path="/department-report" component={DepartmentReport} />
                <Route exact path="/company-report" component={CompanyReport} />

                <Route exact path="/user-info" component={UserInfoPage} />
                <Route exact path="/user-info/edit" component={UserInfoEditPage} />
                <Route exact path="/user-info/edit-password" component={UserPasswordEditPage} />

                <Route exact path="/all-users" component={AllUsers} />

                <Redirect to="/home" />
              </Switch>
            </Layout>
          </Content>
          <Header className="header menuTop">
            <UserStateMenu/>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default withRouter(MainLayout as any);
