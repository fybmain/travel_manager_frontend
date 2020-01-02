import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import UserInfoStore from '../Stores/UserInfoStore';

const { SubMenu } = Menu;

export interface UserStateMenuProps {
}

export class UserStateMenu extends React.Component<UserStateMenuProps> {
  constructor(props: UserStateMenuProps) {
    super(props);
  }

  handleLogout = () => {
    UserInfoStore.logout();
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ height: '64px', lineHeight: '64px' }}>

        <Menu.Item key="logo" style={{ float: 'left' }} disabled>
          <p className='logo'>Travel Reimbursement System</p>
        </Menu.Item>

        <SubMenu
          key="Apply"
          title={UserInfoStore.userInfo.name as string}
          style={{ float: 'right' }}
        >
          {
            (UserInfoStore.userInfo.name === "Admin")?(
              <Menu.Item key="AllUsers">
                <Link to="/all-users">
                  用户信息管理
              </Link>
              </Menu.Item>
            ):null
          }
          <Menu.Item key="UserInfo">
            <Link to="/user-info">
              个人信息
            </Link>
          </Menu.Item>
          <Menu.Item key="Logout" onClick={this.handleLogout}>
            <Link to="/home">
              退出登录
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
