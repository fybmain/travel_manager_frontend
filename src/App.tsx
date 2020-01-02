import React from 'react';
import './App.css';
import { MainStore } from './Stores/MainStore';
import MainLayout from './Components/MainLayout';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import history from './history';
import { LoginPage } from './Components/LoginPage';
import UserInfoStore from './Stores/UserInfoStore';

@observer
class App extends React.Component {

  mainStore = new MainStore();

  constructor(props: any) {
    super(props);
    this.mainStore.init();
  }

  renderContent(){
    if(UserInfoStore.whenAutoLogin) {
      return <div />
    }else{
      if(UserInfoStore.isLogin){
        return (
          <Switch>
            <Route path="/" component={MainLayout} />
            <Redirect to="/home" />
          </Switch>
        );
      }else{
        return (
          <Switch>
            <Route component={LoginPage}/>
          </Switch>
        );
      }
    }
  }

  render() {
    return (
      <Provider mainStore={this.mainStore}>
        <Router history={history}>
          { this.renderContent() }
        </Router>
      </Provider>
    );
  }
}

export default App;
