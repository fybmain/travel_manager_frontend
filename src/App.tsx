import React, { Component } from 'react';
import './App.css';
import { Store1 } from './Stores/Store1';
import {TopNavigationBar} from './Components/TopNavigationBar'
class App extends Component {

  store1 = new Store1;

  
  render() {
    return (
      <div>
        <TopNavigationBar/>
      </div>
    );
  }
}

export default App;