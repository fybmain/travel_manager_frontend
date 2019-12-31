import React, { Component } from 'react';
import './App.css';
import { Store1 } from './Stores/Store1';
import MainLayout from './Components/MainLayout';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';

import history from './history';
import { LoginDialog } from './Components/LoginDialog';
import AllUsers from './Components/AllUsers';
class App extends Component {

  store1 = new Store1;


  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginDialog} />
            <Route path="/" component={MainLayout} />
            <Redirect to="/login"/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;