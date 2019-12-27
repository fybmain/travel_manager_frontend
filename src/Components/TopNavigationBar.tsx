import React, { Component } from 'react';
import '../App.css';
import { Menu, Icon } from 'antd';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Apply } from './Apply';
import { Examine } from './Examine';
import { Report } from './Report';
import { Faq } from './Faq';

const { SubMenu } = Menu;

const menuItems=["首页", "申请", "出差审批", "报销审批", "Q&A"];
const routeItems=["/home", "/apply", "/examine", "/report", "/faq"];
export class TopNavigationBar extends React.Component {
  state = {
    current: menuItems[0],
  };

  handleClick = (e:any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
        <div>
        <HashRouter>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              {
                  menuItems.map((value:string, index:number)=>
                  <Menu.Item key={value}>
                    <Link to={routeItems[index]}>{value}</Link>
                  </Menu.Item>
                  )
              }
              <Menu.Item key="登录" style={{float: 'right'}}>
              登录
              </Menu.Item>
          </Menu>
          <Switch>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/apply" component={Apply}/>
              <Route exact path="/examine" component={Examine}/>
              <Route exact path="/report" component={Report}/>
              <Route exact path="/faq" component={Faq}/>
              <Redirect to="/home"/>
          </Switch>
        </HashRouter>

        </div>
    );
  }
}
