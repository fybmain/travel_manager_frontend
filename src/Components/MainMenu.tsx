import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import history from '../history';
import { UserRole } from '../Models';
import UserInfoStore from '../Stores/UserInfoStore';

const { SubMenu } = Menu;

export interface MainMenuProps {
}

export class MainMenu extends React.Component {
  state = {
    defaultSelectedKey: '',
    defaultOpenKey: '',
  }

  private showApprove = true;
  constructor(props: MainMenuProps) {
    super(props);

    const pathname = history.location.pathname;
    this.state.defaultSelectedKey = pathname;
    if (UserInfoStore.userInfo.role === 0) this.showApprove = false;

    if (pathname.endsWith("apply")) this.state.defaultOpenKey = "apply";
    if (pathname.endsWith("approval")) this.state.defaultOpenKey = "approval";
    if (pathname.endsWith("report")) this.state.defaultOpenKey = "report";
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.state.defaultSelectedKey]}
        defaultOpenKeys={[this.state.defaultOpenKey]}
        theme="dark"
        style={{
          borderBottom: 0,
          position: "fixed",
          bottom: 0,
          top: 64,
          width: 240
        }}>
        {
          MenuSwitch()
        }
      </Menu>
    );
  }
}

const MenuSwitch = () => {
  switch (UserInfoStore.userInfo.role) {
    case UserRole.Admin:
      return [Admin()];
    case UserRole.GeneralManager:
    case UserRole.DepartmentManager:
      return [Home(), Apply(), Approval(), Report()];
    case UserRole.Employee:
      return [Home(), Apply(), Report()];
    default:
      return [];
  }
}

const Home = () => {
  return (
    <Menu.Item key="/home" style={{ float: 'left' }}>
      <Link to="/home">
        <span style={{ fontSize: "large" }}>
          <Icon type="home" />
          首页
        </span>
      </Link>
    </Menu.Item>
  );
}

const Apply = () => {
  return (
    <SubMenu
      key="apply"
      title={
        <span style={{ fontSize: "large" }}>
          <Icon type="form" />
          申请
        </span>
      }
    >
      <Menu.Item key="/travel-apply" style={{ fontSize: "medium" }}
      >
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
  );
}

const Approval = () => {
  return (
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
  );
}

const Report = () => {
  if(UserInfoStore.userInfo.role === 1){
    return <Menu.Item key="/department-report">
            <Link to="/department-report">
            <span style={{ fontSize: "large" }}>
          <Icon type="bar-chart" />
          统计
          </span>
      </Link>
          </Menu.Item>;
  }
  else if(UserInfoStore.userInfo.role === 2){
    return <Menu.Item key="/company-report">
            <Link to="/company-report">
            <span style={{ fontSize: "large" }}>
          <Icon type="bar-chart" />
          统计
          </span>
      </Link>
          </Menu.Item>;
  };
}

const Admin = () => {
  return (
    <Menu.Item key="/all-users" style={{ float: 'left' }}>
      <Link to="/all-users">
        <span style={{ fontSize: "large" }}>
          <Icon type="contacts" />
          用户信息管理
        </span>
      </Link>
    </Menu.Item>
  );
}
