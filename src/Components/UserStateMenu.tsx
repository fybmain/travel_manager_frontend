import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {  Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '@uifabric/example-data';

import UserInfoStore from '../Stores/UserInfoStore';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const { SubMenu } = Menu;

export interface UserStateMenuProps {
}
const menuStyles = mergeStyleSets({
   root2:{
     height:"100%"
   },
   subMenuPeople:{
      display: 'flex', 
      alignItems: 'center', 
      textAlign:'center',
   },
   subMenu:{
      float:"right"
   },
})

export class UserStateMenu extends React.Component<UserStateMenuProps> {
  handleLogout = () => {
    UserInfoStore.logout();
  }

  render() {
    return (
      <div className={menuStyles.root2}>
      <Menu
        theme="dark"
        mode="horizontal"
        >
        <SubMenu
          className={menuStyles.subMenu}
          title={
          <div className={menuStyles.subMenuPeople}>
             <Persona 
              imageUrl={TestImages.personaFemale} 
              size={PersonaSize.size40}
              hidePersonaDetails={false}
             />
            <span>
              {UserInfoStore.userInfo.name}
            </span>
          </div>
          }
          >
          {
            (UserInfoStore.userInfo.role === 3)?(
              <Menu.Item key="AllUsers" >
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
      </div>
    );
  }
}
