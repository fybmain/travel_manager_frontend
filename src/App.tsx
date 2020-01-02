import React, { Component } from 'react';
import './App.css';
import { MainStore } from './Stores/MainStore';
import MainLayout from './Components/MainLayout';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';

import history from './history';
import { LoginPage } from './Components/LoginPage';
import AllUsers from './Components/AllUsers';
import { Provider } from 'mobx-react';

class App extends Component {

  mainStore = new MainStore();

  render() {
    return (
      <Provider mainStore={this.mainStore}>
        <div>
          <Router history={history}>
            <Switch>
              <Route path="/login" component={LoginPage} clearStore={this.clearStore} />
              <Route path="/" component={MainLayout} />
              <Redirect to="/login" />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
clearStore=()=>{
  console.log("clear")
  this.mainStore=new MainStore();
}
}


export default App;