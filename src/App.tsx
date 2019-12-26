import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';
import { PopOver } from './popOver';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PopOver />
      </div>
    );
  }
}

export default App;