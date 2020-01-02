import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, Router, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import '../App.css';
import history from '../history';

import { Home } from './Home';
import { TravelApplyListPage } from './TravelApplyListPage';
import { TravelApplyCreatePage } from './TravelApplyCreatePage';
import { ReimbursementApplyListPage } from './ReimbursementApplyListPage';
import { ReimbursementApplyCreatePage } from './ReimbursementApplyCreatePage';
import { TravelApprovalPage } from './TravelApprovalPage';
import { ReimbursementApprovalListPage } from './ReimbursementApprovalListPage';
import { ReimbursementApprovalPage } from './ReimbursementApprovalPage';

import { PersonalReport } from './PersonalReport';
import { DepartmentReport } from './DepartmentReport';
import { CompanyReport } from './CompanyReport';

import { Faq } from './Faq';
import UserInfoPage from './UserInfoPage';
import { UserInfoEditPage } from './UserInfoEditPage';
import { UserPasswordEditPage } from './UserPasswordEditPage';


import AllUsers from './AllUsers';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface props extends RouteComponentProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
class MainLayout extends Component<props, {}> {
  state = {
    current: '',
    loginDialogVisible: false,
    registerDialogVisible: false,
  }

  constructor(props: any) {
    super(props);
  }

  handleClick = (e: ClickParam) => {
    this.setState({
      current: e.key,
    });
  }

  onClickLogin = (e: ClickParam) => {
    this.setState({
      loginDialogVisible: true,
    });
  }

  onClickRegister = (e: ClickParam) => {
    this.setState({
      registerDialogVisible: true,
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Layout>
            <Sider width={300} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['Home']}
                defaultOpenKeys={['Home']}
                style={{ borderBottom: 0, position: "fixed", bottom: 0, top: 64, width: 300 }}
              >
                <Menu.Item key="Home" style={{ float: 'left' }}>
                  <Link to="/home">
                    <span style={{ fontSize: "large" }}>
                      <Icon type="home" />
                      首页
                      </span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="Apply"
                  title={
                    <span style={{ fontSize: "large" }}>
                      <Icon type="form" />
                      申请
                      </span>
                  }
                >
                  <Menu.Item key="TravelApply" style={{ fontSize: "medium" }}>
                    <Link to="/travel-apply">
                      出差申请
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="ReimbursementApply" style={{ fontSize: "medium" }}>
                    <Link to="/reimbursement-apply">
                      报销申请
                      </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="Approval"
                  title={
                    <span style={{ fontSize: "large" }}>
                      <Icon type="check-square" />
                      审批
                      </span>
                  }
                >
                  <Menu.Item key="TravelApproval" style={{ fontSize: "medium" }}>
                    <Link to="/travel-approval">
                      出差审批
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="ReimbursementApproval" style={{ fontSize: "medium" }}>
                    <Link to="/reimbursement-approval">
                      报销审批
                      </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="Report"
                  title={
                    <span style={{ fontSize: "large" }}>
                      <Icon type="bar-chart" />
                      统计
                      </span>
                  }
                >
                  <Menu.Item key="PersonalReport" style={{ fontSize: "medium" }}>
                    <Link to="/personal-report">
                      个人报表
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="DepartmentReport" style={{ fontSize: "medium" }}>
                    <Link to="/department-report">
                      部门报表
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="CompanyReport" style={{ fontSize: "medium" }}>
                    <Link to="/company-report">
                      公司报表
                      </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px', position: "fixed", top: 64, left: 300, right: 0, bottom: 0 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {
                  this.props.mainStore.breadcrumb.map((value, index) => <Breadcrumb.Item>{value}</Breadcrumb.Item>)
                }
              </Breadcrumb>
              <Switch>
                <Route path="/user-info" component={UserInfoPage} />
                <Route exact path="/home" component={Home} />

                <Route exact path="/travel-apply" component={TravelApplyListPage} />
                <Route exact path="/travel-apply/create" component={TravelApplyCreatePage} />

                <Route exact path="/reimbursement-apply" component={ReimbursementApplyListPage} />
                <Route exact path="/reimbursement-apply/create" component={ReimbursementApplyCreatePage} />

                <Route exact path="/travel-approval" component={TravelApprovalPage} />

                <Route exact path="/reimbursement-approval" component={ReimbursementApprovalListPage} />
                <Route exact path="/reimbursement-approval/detail" component={ReimbursementApprovalPage} />

                <Route exact path="/personal-report" component={PersonalReport} />
                <Route exact path="/department-report" component={DepartmentReport} />
                <Route exact path="/company-report" component={CompanyReport} />

                <Route exact path="/faq" component={Faq} />
                <Route exact path="/all-users" component={AllUsers} />
                <Route exact path="/user-info/edit" component={UserInfoEditPage} />
                <Route exact path="/user-info/edit-password" component={UserPasswordEditPage} />
                <Redirect to="/home" />
              </Switch>
            </Layout>
          </Layout>
          <Header className="header menuTop">
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ height: '64px', lineHeight: '64px' }}
            >
              <Menu.Item key="logo" style={{ float: 'left' }} disabled>
                <p className='logo'>Travel Reimbursement System</p>
              </Menu.Item>

              <SubMenu
                key="Apply"
                title={UserInfoStore.userInfo.name as string}
                style={{ float: 'right' }}
              >
                {
                  UserInfoStore.userInfo.name === "Admin" ?
                    <Menu.Item key="AllUsers">
                      <Link to="/all-users">
                        用户信息管理
                    </Link>
                    </Menu.Item>
                    : null
                }
                <Menu.Item key="UserInfo">
                  <Link to="/user-info">
                    个人信息
                    </Link>
                </Menu.Item>
                <Menu.Item key="LogOut" onClick={() => { UserInfoStore.logout(); }}>
                  <Link to="/login">
                    退出登录
                      </Link>
                </Menu.Item>
              </SubMenu>

            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default withRouter(MainLayout as any);
