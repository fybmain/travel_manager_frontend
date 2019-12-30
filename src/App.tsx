import React, { Component } from 'react';
import './App.css';
import { Store1 } from './Stores/Store1';
import { MainLayout } from './Components/MainLayout';
class App extends Component {

  store1 = new Store1;

  
  render() {
    return (
      <div>
        <MainLayout/>
      </div>
    );
  }
}

export default App;