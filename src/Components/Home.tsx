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
import { RGBA_REGEX } from 'office-ui-fabric-react';
interface HomeProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class Home extends Component<HomeProps> {
  @observable private messageList: Message[]|undefined = undefined;
  @observable private messageList2: Message[]|undefined = undefined;

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
    MessageApi.getMessageList2().then(
      (result) => {
        if(result.message==="ok"){
          this.messageList2 = result.items;
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
  
  // refreshMessage2() {
  //   this.messageList2 = undefined;
  //   MessageApi.getMessageList2().then(
  //     (result) => {
  //       if(result.message==="ok"){
  //         this.messageList2 = result.items;
  //       }else{
  //         message.error(result.message);
  //       }
  //     }
  //   );
  // }

  render() {
    return (
      <div className="homeBackground">
        <div style={{backgroundColor:"rgba(100,100,100,0)"}}>
        <Row>
          <Col
            span={10}
            style={{
              width: "35%",
              overflow: "hidden",
              padding: 40,
              MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.3)",
            }}
            className="changeStyle">
            <Card
              className="card-home"
              bordered={false}
              title={
                <span>
                  <Icon type="mail" />
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
              width: "65%",
              overflow: "hidden",
              padding: 40,
              MozBoxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.3)",
            }}
            className="changeStyle">
            <Card
              className="card-home"
              bordered={false}
              title={
                <span>
                  <Icon type="form" />
                  &nbsp;&nbsp;审核中
                </span>
              }>
              <Spin spinning={this.messageList2===undefined}>
                <List className="changeStyle"
                  dataSource={this.messageList2}
                  renderItem={this.renderMessage}
                  bordered={false}/>
              </Spin>
            </Card>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
}
