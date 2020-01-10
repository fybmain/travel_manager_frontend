import React from 'react';
import './App.css';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import history from './history';
import { MainStore } from './Stores/MainStore';
import MainLayout from './Components/MainLayout';
import { LoginPage } from './Components/LoginPage';
import { ResetPasswordPage } from './Components/ResetPasswordPage';
import UserInfoStore from './Stores/UserInfoStore';

@observer
class App extends React.Component {

  mainStore = new MainStore();

  /*
  constructor(props: any) {
    super(props);
  }
  */

  renderContent() {
    if (UserInfoStore.whenAutoLogin) {
      return <div />
    } else {
      return (
        <Switch>
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          {
            (UserInfoStore.isLogin) ? (
              <Route component={MainLayout} />
            ) : (
                <Route component={LoginPage} />
              )
          }
        </Switch>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <Provider mainStore={this.mainStore}>
          <Router history={history}>
            {this.renderContent()}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
