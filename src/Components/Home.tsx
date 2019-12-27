import React, { Component } from 'react';
import '../App.css';
import { Row, Col, Card } from 'antd';
//import '../my.module.less';
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
    <div className="card">
      <Card title="报销流程" bordered={false}>
        流程图
      </Card>
    </div>
  );
}