import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Stack, mergeStyleSets } from 'office-ui-fabric-react'
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import '../App.css';

import { Home } from './Home';
import { TravelApplyListPage } from './Travel/TravelApplyListPage';
import { TravelApplyDetailPage } from './Travel/TravelApplyDetailPage';
import { TravelApplyCreatePage } from './Travel/TravelApplyCreatePage';
import { ReimbursementApplyListPage } from './Reimbursement/ReimbursementApplyListPage';
import { ReimbursementApplyCreatePage } from './Reimbursement/ReimbursementApplyCreatePage';
import { TravelApprovalListPage } from './Travel/TravelApprovalListPage';
import { TravelApprovalDetailPage } from './Travel/TravelApprovalDetailPage';
import { ReimbursementApprovalListPage } from './Reimbursement/ReimbursementApprovalListPage';
import { ReimbursementDetailPage } from './Reimbursement/ReimbursementDetailPage';

import { PersonalReport } from './Reports/PersonalReport';
import { DepartmentReport } from './Reports/DepartmentReport';
import { CompanyReport } from './Reports/CompanyReport';

import UserInfoPage from './User/UserInfoPage';
import { UserInfoEditPage } from './User/UserInfoEditPage';

import AllUsers from './User/AllUsers';
import { MainStore } from '../Stores/MainStore';
import { MainMenu } from './MainMenu';
import { UserStateMenu } from './UserStateMenu';
import UserInfoStore from '../Stores/UserInfoStore';

import logo from '../Pictures/logo.png'

const { Header, Content, Sider } = Layout;

interface MainLayoutProps extends RouteComponentProps {
  mainStore: MainStore;
}

const headerStyles=mergeStyleSets({
  root:{
    display:"flex",
    alignItems:"center",
  },
  header:{
    position: "fixed",
    left:0,
    right:0,
    top:0,
  },
})
@inject("mainStore") @observer
class MainLayout extends React.Component<MainLayoutProps, {}> {

  /*
  constructor(props: MainLayoutProps) {
    super(props);
  }
  */

  render() {
    return (
      <div>
        <Layout>
          <Sider style={{ width:'240'}}>
            <MainMenu/>
          </Sider>
          <Content>
            <Layout style={{ padding: '0 20px 24px 0', position: "fixed", top: 64, left: 240, right: 0, bottom: 0, overflowY: "auto",background:"#ebebf0" }}>
              <Breadcrumb style={{ margin: '24px 0 0 24px' }}>
                {
                  this.props.mainStore.breadcrumb.map((value, index) => <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>)
                }
              </Breadcrumb>
              <Switch>
                <Route exact path="/home" component={Home} />

                <Route exact path="/travel-apply" component={TravelApplyListPage} />
                <Route exact path="/travel-apply/create" component={TravelApplyCreatePage} />
                <Route exact path="/travel-apply/:applyId/detail" component={TravelApplyDetailPage} />

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

                <Route exact path="/all-users" component={AllUsers} />
                {
                  UserInfoStore.userInfo.role!==3?
                  <Redirect to="/home" />
                  :<Redirect to="/all-users" />
                }
                
              </Switch>
            </Layout>
          </Content>
          <Header className={headerStyles.header}>
              <Stack horizontal horizontalAlign="space-between" className={headerStyles.root}>
                <MyLogo/>
                <UserStateMenu/>
              </Stack>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default withRouter(MainLayout as any);

const logoStyles = mergeStyleSets({
  root:{
    width: "160px",
  },
  imgWapper:{
    height: "auto",
    display: "flex",
    alignItems:"center",
  },
  img:{
    height: "32px",
  },
  text:{
    margin: "0 0 0 12px",
    color: "#fff",
    fontWeight: 600,
    fontSize: "20px",
    fontFamily: "Avenir,Helvetica Neue,Arial,Helvetica,sans-serif",
  }
})
const MyLogo=()=>
  <div className={logoStyles.root}>
    <Stack  horizontal horizontalAlign="space-between">
      <div className={logoStyles.imgWapper}>
      <img src={logo} alt="" className={logoStyles.img}/>
      </div>
      <h1 className={logoStyles.text}>TR SYSTEM</h1>
    </Stack>
  </div>


