import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';

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
            <Avatar>{UserInfoStore.userInfo.name.substr(0,1)}</Avatar>
            {/* <Persona 
              imageUrl={TestImages.personaFemale} 
              size={PersonaSize.size40}
              hidePersonaDetails={false}/> */}
              <span>&nbsp;&nbsp;</span>
            <span>{UserInfoStore.userInfo.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          }>
          <Menu.Item key="UserInfo">
            <Link to="/user-info">
              个人信息
            </Link>
          </Menu.Item>
          <Menu.Item key="Logout" onClick={this.handleLogout}>
            <Link to="/login">
              退出登录
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
      </div>
    );
  }
}
