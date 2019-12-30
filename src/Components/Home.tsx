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
            <div className="home-head1">
              差旅报销
            </div>
            <div className="home-head2">
            差旅活动全过程管理，出差，报销，审批, 统计一体
            </div>
            <br/><br/>
            <button className="home-button">了解更多</button>
          </div>
        </div>
        {box1()}
        {box2()}
        {/* <div style={{height:"300px"}}>
          <Row>
            <Col span={2}></Col>
            <Col span={9}>{box()}</Col>
            <Col span={2}></Col>
            <Col span={9}>{box()}</Col>
            <Col span={2}></Col>
          </Row>
        </div> */}
      </div>
    );
  }
}

const box1 = ()=>{
  return(
    <div className="box">
      <Card title="员工申请流程" bordered={false}>
        流程图
      </Card>
    </div>
  );
}

const box2 = ()=>{
  return(
    <div className="box">
      <Card title="经理审批流程" bordered={false}>
        流程图
      </Card>
    </div>
  );
}