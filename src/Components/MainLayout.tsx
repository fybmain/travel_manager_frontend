import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import { Route, Switch, Link, Redirect, Router, RouteComponentProps, withRouter } from 'react-router-dom';

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

import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';
import { ClickParam } from 'antd/lib/menu';
import AllUsers from './AllUsers';
import { MainStore } from '../Stores/MainStore';
import { inject, observer } from 'mobx-react';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface props extends RouteComponentProps{
  mainStore:MainStore;
}

@inject("mainStore") @observer
class MainLayout extends Component<props, {}> {
  state = {
    current: '',
    loginDialogVisible: false,
    registerDialogVisible: false,
  }

  constructor(props:any){
    super(props);
    console.log(this.props.mainStore.userInfo);
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
            <Header className="header">
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="logo" style={{ float: 'left' }} disabled>
                  <p className='logo'>Travel Reimbursement System</p>
                </Menu.Item>

                <Menu.Item key="AllUsers" style={{ float: 'right' }}>
                  <Link to="/all-users">
                    Admin
                  </Link>
                </Menu.Item>
                <Menu.Item key="UserInfo" style={{ float: 'right' }}>
                  <Link to="/user-info">
                    周东
                    </Link>
                </Menu.Item>

                 <Menu.Item key="Register" onClick={this.onClickRegister} style={{ float: 'right' }}>
                  注册
                  <RegisterDialog visible={this.state.registerDialogVisible} />
                </Menu.Item>
                <Menu.Item key="Login" onClick={this.onClickLogin} style={{ float: 'right' }}>
                  登录
                  <LoginDialog visible={this.state.loginDialogVisible} />
                </Menu.Item> 
              </Menu>
            </Header>
            <Layout>
              <Sider width={250} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['Home']}
                  defaultOpenKeys={['Home']}
                  style={{ height: '655px', borderRight: 0 }}
                >
                  <Menu.Item key="Home" style={{ float: 'left' }}>
                    <Link to="/home">
                      <span>
                        <Icon type="home" />
                        首页
                      </span>
                    </Link>
                  </Menu.Item>
                  <SubMenu
                    key="Apply"
                    title={
                      <span>
                        <Icon type="form" />
                        申请
                      </span>
                    }
                  >
                    <Menu.Item key="TravelApply">
                      <Link to="/travel-apply">
                        出差申请
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="ReimbursementApply">
                      <Link to="/reimbursement-apply">
                        报销申请
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="Examine"
                    title={
                      <span>
                        <Icon type="check-square" />
                        审批
                      </span>
                    }
                  >
                    <Menu.Item key="TravelExamine">
                      <Link to="/travel-approval">
                        出差审批
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="ReimbursementExamine">
                      <Link to="/reimbursement-approval">
                        报销审批
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="Report"
                    title={
                      <span>
                        <Icon type="bar-chart" />
                        统计
                      </span>
                    }
                  >
                    <Menu.Item key="PersonalReport">
                       <Link to="/personal-report">
                        个人报表
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="DepartmentReport">
                      <Link to="/department-report">
                        部门报表
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="CompanyReport">
                      <Link to="/company-report">
                        公司报表
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
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
                  <Redirect to="/login"/>
                </Switch>
              </Layout>
            </Layout>
          </Layout>
      </div>
    );
  }
}
export default withRouter(MainLayout as any);
