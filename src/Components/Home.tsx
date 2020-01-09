import React, { Component } from 'react';
import { Card, Icon, Col, Row, message, Spin, List } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
import '../App.css';
import { Message } from '../Models';
import { MessageApi } from '../api/MessageApi';
import { MainStore } from '../Stores/MainStore';
import { PersonChart } from './Reports/PersionChart';
import "antd/dist/antd.less";
import "../App.less";
interface HomeProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class Home extends Component<HomeProps> {
  @observable private messageList: Message[]|undefined = undefined;

  constructor(props: any) {
    super(props);
    this.props.mainStore.breadcrumb = ["首页"];
    this.refreshMessage();
  }

  refreshMessage() {
    this.messageList = undefined;
    MessageApi.getMessageList().then(
      (result) => {
        if(result.message==="ok"){
          this.messageList = result.items;
        }else{
          message.error(result.message);
        }
      }
    );
  }

  renderMessage = (item: Message) => (
    <List.Item>
      <List.Item.Meta description={item.content}/>
    </List.Item>
  )

  render() {
    return (
      <div className="homeBackground">
        <div className="background">
          <div className="introduction">
            <div className="home-head1">
              差旅报销
            </div>
            <div className="home-head2">
              <p>差旅活动全过程管理，集出差，报销，审批, 统计一体</p>
            </div>
            <br /><br />
            {/* <button className="home-button" onClick={() => { history.push('/travel-apply/create'); }}>去申请</button> */}
          </div>
        </div>
        <Row>
          <Col
            span={8}
            style={{
              width: "30%",
              overflow: "hidden",
              padding: 20,
              MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
            }}>
            <Card
              className="card"
              bordered={false}
              title={
                <span>
                  <Icon type="form" />
                  &nbsp;&nbsp;最新消息
                </span>
              }>
              <Spin spinning={this.messageList===undefined}>
                <List className="changeStyle"
                  dataSource={this.messageList}
                  renderItem={this.renderMessage}
                  bordered={false}/>
              </Spin>
            </Card>
          </Col>
          <Col span={16} style={{ margin: "auto", overflow: "hidden", padding: 20, MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)" }}>
            <PersonChart mainStore={this.props.mainStore} />
          </Col>
        </Row>
      </div>
    );
  }
}
