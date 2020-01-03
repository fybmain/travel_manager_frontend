import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import history from '../history';

const { SubMenu } = Menu;

export interface MainMenuProps {
}

export class MainMenu extends React.Component {
  state = {
    defaultSelectedKey: '',
    defaultOpenKey: '',
  }

  constructor(props: MainMenuProps) {
    super(props);

    const pathname = history.location.pathname;
    this.state.defaultSelectedKey = pathname;
    
    if(pathname.endsWith("apply")) this.state.defaultOpenKey="apply";
    if(pathname.endsWith("approval")) this.state.defaultOpenKey="approval";
    if(pathname.endsWith("report")) this.state.defaultOpenKey="report";
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.state.defaultSelectedKey]}
        defaultOpenKeys={[this.state.defaultOpenKey]}
        style={{
          borderBottom: 0,
          position: "fixed",
          bottom: 0,
          top: 64,
          width: 300,
        }}>
        <Menu.Item key="/home" style={{ float: 'left' }}>
          <Link to="/home">
            <span style={{ fontSize: "large" }}>
              <Icon type="home" />
              首页
              </span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="apply"
          title={
            <span style={{ fontSize: "large" }}>
              <Icon type="form" />
              申请
              </span>
          }
        >
          <Menu.Item key="/travel-apply" style={{ fontSize: "medium" }}>
            <Link to="/travel-apply">
              出差申请
              </Link>
          </Menu.Item>
          <Menu.Item key="/reimbursement-apply" style={{ fontSize: "medium" }}>
            <Link to="/reimbursement-apply">
              报销申请
              </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="approval"
          title={
            <span style={{ fontSize: "large" }}>
              <Icon type="check-square" />
              审批
              </span>
          }
        >
          <Menu.Item key="/travel-approval" style={{ fontSize: "medium" }}>
            <Link to="/travel-approval">
              出差审批
              </Link>
          </Menu.Item>
          <Menu.Item key="/reimbursement-approval" style={{ fontSize: "medium" }}>
            <Link to="/reimbursement-approval">
              报销审批
              </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="report"
          title={
            <span style={{ fontSize: "large" }}>
              <Icon type="bar-chart" />
              统计
              </span>
          }
        >
          <Menu.Item key="/personal-report" style={{ fontSize: "medium" }}>
            <Link to="/personal-report">
              个人报表
              </Link>
          </Menu.Item>
          <Menu.Item key="/department-report" style={{ fontSize: "medium" }}>
            <Link to="/department-report">
              部门报表
              </Link>
          </Menu.Item>
          <Menu.Item key="/company-report" style={{ fontSize: "medium" }}>
            <Link to="/company-report">
              公司报表
              </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}