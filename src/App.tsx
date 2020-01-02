import React, { Component } from 'react';
import './App.css';
import { MainStore } from './Stores/MainStore';
import MainLayout from './Components/MainLayout';
import { Route, Switch, Link, Redirect, Router } from 'react-router-dom';

import history from './history';
import { LoginPage } from './Components/LoginPage';
import AllUsers from './Components/AllUsers';
import { Provider, observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class App extends Component {

  mainStore = new MainStore();
  @observable login = false;

  render() {
    return (
      <Provider mainStore={this.mainStore}>
        <div>
          <Router history={history}>
            <Switch>
              <Route path="/login" component={LoginPage}/>
              <Route path="/" component={MainLayout} />
              <Redirect to="/login" />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}


export default App;