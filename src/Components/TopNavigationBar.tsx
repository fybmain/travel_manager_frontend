import React, { Component } from 'react';
import '../App.css';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { HashRouter, Route, Switch, Link, Redirect, Router } from 'react-router-dom';
import { Home } from './Home';
import { TravelApplyPage } from './TravelApplyPage';
import { ReimbursementApplyPage } from './ReimbursementApplyPage';
import { TravelExaminePage } from './TravelExaminePage';
import { ReimbursementExaminePage } from './ReimbursementExaminePage';
import { Faq } from './Faq';
import { AllUsers } from './AllUsers';
import { DepartmentReport } from './DepartmentReport';
import { CompanyReport } from './CompanyReport';
import { PersonalReport } from './PersonalReport';

const { SubMenu } = Menu;

export class TopNavigationBar extends Component {
  state = {
    current: '',
  }

  handleClick = (e:ClickParam) => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
        <div>
        <HashRouter>
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
                <Link to="/travel-examine">
                  出差审批
                </Link>
              </Menu.Item>
              <Menu.Item key="ReimbursementExamine">
                <Link to="/reimbursement-examine">
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
              </Menu.Item><Menu.Item key="CompanyReport">
                <Link to="/company-report">
                  部门报表
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="AllUsers" style={{float: 'right'}}>
              <Link to="/allUsers">
                武玥彤
              </Link>
            </Menu.Item>
            {/*<Menu.Item key="/register" style={{float: 'right'}}>
              注册
            </Menu.Item>
            <Menu.Item key="/login" style={{float: 'right'}}>
              登录
    </Menu.Item>*/}
          </Menu>
          <Switch>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/travel-apply" component={TravelApplyPage}/>
              <Route exact path="/reimbursement-apply" component={ReimbursementApplyPage }/>
              <Route exact path="/travel-examine" component={TravelExaminePage}/>
              <Route exact path="/reimbursement-examine" component={ReimbursementExaminePage}/>
              <Route exact path="/personal-report" component={PersonalReport}/>
              <Route exact path="/department-report" component={DepartmentReport}/>
              <Route exact path="/company-report" component={CompanyReport}/>
              <Route exact path="/faq" component={Faq}/>
              <Route exact path="/allUsers" component={AllUsers}/>
              <Redirect to="/home"/>
          </Switch>
        </HashRouter>

        </div>
    );
  }
}
