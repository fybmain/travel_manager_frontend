import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

import '../App.css';
import { MainStore } from '../Stores/MainStore';

interface HomeProps{
  mainStore:MainStore;
}

@inject("mainStore") @observer
export class Home extends Component<HomeProps> {

  constructor(props:any){
    super(props);
    this.props.mainStore.breadcrumb=["首页"];
  }

  render() {
    return (
      <div className="homeBackground">
        <div className="background">
          <div className="introduction">
            <div className="home-head1">
              差旅报销
            </div>
            <div className="home-head2">
              差旅活动全过程管理，集出差，报销，审批, 统计一体
            </div>
            <br /><br />
            <button className="home-button">了解更多</button>
          </div>
        </div>
        {box1()}
        <br />
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

const box1 = () => {
  return (
    <div className="box">
      <Card title={
        <span>
          <Icon type="form" />
          &nbsp;&nbsp;员工申请流程
        </span>
      }
        bordered={false}
      >
      </Card>
    </div>
  );
}

const box2 = () => {
  return (
    <div className="box">
      <Card
        title={
          <span>
            <Icon type="form" />
            &nbsp;&nbsp;经理审批流程
          </span>
        }
        bordered={false}>
      </Card>
    </div>
  );
}