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
        <Row>
          <Col
            span={10}
            style={{
              width: "30%",
              overflow: "hidden",
              padding: 40,
              MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
            }}
            className="changeStyle">
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
          <Col
            span={14}
            style={{
              width: "70%",
              overflow: "hidden",
              padding: 40,
              MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
            }}
            className="changeStyle">
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
        </Row>
      </div>
    );
  }
}
