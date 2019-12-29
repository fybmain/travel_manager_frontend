import React, { Component } from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';

import '../App.css';
import history from '../history';

import { Home } from './Home';
import { TravelApplyListPage } from './TravelApplyListPage';
import { TravelApplyCreatePage } from './TravelApplyCreatePage';
import { ReimbursementApplyListPage } from './ReimbursementApplyListPage';
import { ReimbursementApplyCreatePage } from './ReimbursementApplyCreatePage';
import { TravelApprovalPage } from './TravelApprovalPage';
import { ReimbursementApprovalPage } from './ReimbursementApprovalPage';

import { PersonalReport } from './PersonalReport';
import { DepartmentReport } from './DepartmentReport';
import { CompanyReport } from './CompanyReport';

import { Faq } from './Faq';
import { AllUsers } from './AllUsers';

import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';

const { SubMenu } = Menu;

export class TopNavigationBar extends Component {
  state = {
    current: '',
    loginDialogVisible: false,
    registerDialogVisible: false,
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
        <Router history={history}>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="blank" style={{float: 'left'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Menu.Item>
            <Menu.Item key="Home" style={{float: 'left'}}>
              <Link to="/home">
                首页
              </Link>
            </Menu.Item>
            <SubMenu title="申请" style={{float: 'left'}}>
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
            <SubMenu title="审批" style={{float: 'left'}}>
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
            <SubMenu title="统计" style={{float: 'left'}}>
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

            <Menu.Item key="AllUsers" style={{float: 'right'}}>
              <Link to="/all-users">
                周东
              </Link>
            </Menu.Item>

            {/* <Menu.Item key="Register" onClick={this.onClickRegister} style={{float: 'right'}}>
              注册
              <RegisterDialog visible={this.state.registerDialogVisible}/>
            </Menu.Item>
            <Menu.Item key="Login" onClick={this.onClickLogin} style={{float: 'right'}}>
              登录
              <LoginDialog visible={this.state.loginDialogVisible}/>
            </Menu.Item> */}
          </Menu>

          <Switch>
            <Route exact path="/home" component={Home}/>
            
            <Route exact path="/travel-apply" component={TravelApplyListPage}/>
            <Route exact path="/travel-apply/create" component={TravelApplyCreatePage}/>

            <Route exact path="/reimbursement-apply" component={ReimbursementApplyListPage}/>
            <Route exact path="/reimbursement-apply/create" component={ReimbursementApplyCreatePage}/>

            <Route exact path="/travel-approval" component={TravelApprovalPage}/>

            <Route exact path="/reimbursement-approval" component={ReimbursementApprovalPage}/>

            <Route exact path="/personal-report" component={PersonalReport}/>
            <Route exact path="/department-report" component={DepartmentReport}/>
            <Route exact path="/company-report" component={CompanyReport}/>

            <Route exact path="/faq" component={Faq}/>
            <Route exact path="/all-users" component={AllUsers}/>
            
            <Redirect to="/home"/>
          </Switch>
        </Router>
      </div>
    );
  }
}
