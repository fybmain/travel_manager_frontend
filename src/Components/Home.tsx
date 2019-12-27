import React, { Component } from 'react';
import '../App.css';
import Grid from 'antd/lib/card/Grid';
import { Row, Col } from 'antd';
export class Home extends Component {
  render() {
    return (
      <div className="allBackground">
        <div className="background">
          <div className="introduction">
            <div >
            介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
            </div>
          </div>
        </div>
        <div style={{height:"300px"}}>
          <Row>
            <Col span={2}></Col>
            <Col span={9}>{box()}</Col>
            <Col span={2}></Col>
            <Col span={9}>{box()}</Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const box = ()=>{
  return(
    <div className="box">
    </div>
  );
}