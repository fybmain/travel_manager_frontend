import React from 'react';
import '../App.css';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';

import history from '../history';
import { Home } from './Home';
import { TravelApplyListPage } from './TravelApplyListPage';
import { ReimbursementApplyPage } from './ReimbursementApplyPage';
import { TravelApprovalPage } from './TravelApprovalPage';
import { ReimbursementApprovalPage } from './ReimbursementApprovalPage';
import { Report } from './Report';
import { Faq } from './Faq';
import { PersonalReport } from './PersonalReport';
import { DepartmentReport } from './DepartmentReport';
import { CompanyReport } from './CompanyReport';
import { LoginDialog } from './LoginDialog';
import { TravelApplyCreatePage } from './TravelApplyCreatePage';

const { SubMenu } = Menu;

export class TopNavigationBar extends React.Component {
  state = {
    current: '',
    loginDialogVisible: false,
  }

  handleClick = (e: ClickParam) => {
    this.setState({
      current: e.key,
    });
  };

  onClickLogin = (e: ClickParam) => {
    this.setState({
      loginDialogVisible: true,
    });
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="Home">
              <Link to="/home">
                首页
              </Link>
            </Menu.Item>
            <SubMenu title="申请">
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
            <SubMenu title="审批">
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
            <SubMenu title="统计">
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

            <Menu.Item key="Register" style={{float: 'right'}}>
              注册
            </Menu.Item>
            <Menu.Item key="Login" onClick={this.onClickLogin} style={{float: 'right'}}>
              登录
              <LoginDialog visible={this.state.loginDialogVisible}/>
            </Menu.Item>
          </Menu>
          <Switch>
            <Route exact path="/home" component={Home}/>
            
            <Route exact path="/travel-apply" component={TravelApplyListPage}/>
            <Route exact path="/travel-apply/create" component={TravelApplyCreatePage}/>

            <Route exact path="/reimbursement-apply" component={ReimbursementApplyPage}/>

            <Route exact path="/travel-approval" component={TravelApprovalPage}/>

            <Route exact path="/reimbursement-approval" component={ReimbursementApprovalPage}/>

            <Route exact path="/personal-report" component={PersonalReport}/>
            <Route exact path="/department-report" component={DepartmentReport}/>
            <Route exact path="/company-report" component={CompanyReport}/>

            <Route exact path="/faq" component={Faq}/>
            
            <Redirect to="/home"/>
          </Switch>
        </Router>
      </div>
    );
  }
}
