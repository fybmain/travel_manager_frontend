import React, { Component } from 'react';
import { Card, Icon, Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import history from '../history';
import '../App.css';
import { MainStore } from '../Stores/MainStore';
import { PersonChart } from './Reports/PersionChart';

interface HomeProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class Home extends Component<HomeProps> {

  constructor(props: any) {
    super(props);
    this.props.mainStore.breadcrumb = ["首页"];
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
            <button className="home-button" onClick={() => { history.push('/travel-apply/create'); }}>去申请</button>
          </div>
        </div>
        <Row>
          <Col span={8} style={{ width: "30%", overflow: "hidden", padding: 20, MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)" }}>
            {box1()}
          </Col>
          <Col span={16} style={{ margin: "auto", overflow: "hidden", padding: 20, MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)" }}>
            <PersonChart mainStore={this.props.mainStore} />
          </Col>
        </Row>
      </div>
    );
  }
}

const box1 = () => {
  return (
    <Card className="card"
      title={
        <span>
          <Icon type="form" />
          &nbsp;&nbsp;最新消息
        </span>
      }
      bordered={false}
    >
    </Card>
  );
}
