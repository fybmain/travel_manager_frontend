import React from 'react';
import { Form, Upload, Icon, Button, Divider, Row, Col, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
import { Payment } from '../Models';
import { ReimbursementApi } from '../api/ReimbursementApi';
import { MainStore } from '../Stores/MainStore';
import UserInfoStore from '../Stores/UserInfoStore';
import { InputMoneyAmount } from './InputMoneyAmount';

interface ReimbursementApplyCreatePageProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class ReimbursementApplyCreatePage extends React.Component<ReimbursementApplyCreatePageProps> {
  private applyId: number;
  @observable private fileList: UploadFile[] = [];
  @observable budget:Payment = {
    food: 0,
    hotel: 0,
    vehicle: 0,
    other: 0,
  }

  constructor(props: ReimbursementApplyCreatePageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["申请", "报销申请", "创建"];
    const searchParams = new URLSearchParams(history.location.search);
    const applyId=searchParams.get('applyId') as string;
    this.applyId = parseInt(applyId);
  }

  onImageListChange = (param: UploadChangeParam<UploadFile<any>>) => {
    const file = param.file;
    let fileList = [...param.fileList];
    if(file.status==="error"){
      const index = fileList.findIndex((value) => (value.uid===file.uid));
      if(index>=0){
        fileList.splice(index, 1);
        if(file.error instanceof ProgressEvent){
          message.error("上传失败：网络错误");
        }else{
          switch(file.error.status){
            case 413:
              message.error("上传失败：图片尺寸过大");
              break;
              default:
                message.error("上传失败：未知错误");
                break;
          }
        }
      }
    }
    this.fileList = fileList;
  }

  handleSubmit = async () => {
    if(this.fileList.findIndex((value) => (value.status==="uploading"))>=0){
      message.warning("请等待图片上传完毕");
      return;
    }

    const pictureIdList = (
      this.fileList
      .filter((value) => (value.status==="done"))
      .map((value) => (value.response.data.pictureId))
    );
    const result = await ReimbursementApi.createReimbursementApply({
      payment: this.budget,
      pictureIds: pictureIdList,
      travelApplyId: this.applyId,
    });
    if(result.message === "ok") {
      history.push('/reimbursement-apply');
      message.success("创建成功");
    }else{
      message.error(result.message);
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 11 },
      },
    };
    return (
      <div className="tablePage">
        <Form {...formItemLayout} layout="horizontal" labelAlign="left">
          <div style={{ paddingTop: "50px" }} />

          <Row>
            <Col span={2}/>
            <Col span={11}>
              <Form.Item label="申请人">
                <p style={{ textAlign: "left" }}>{UserInfoStore.userInfo.name}</p>
              </Form.Item>

              <Form.Item label="出差申请编号">
                <p style={{ textAlign: "left" }}>{this.applyId}</p>
              </Form.Item>

              <Form.Item label="发票上传" wrapperCol={{span:16}}>
                <Upload
                  name="file"
                  action="/api/image/upload"
                  fileList={this.fileList}
                  onChange={this.onImageListChange}
                  accept="image/*"
                  listType="picture-card">
                  <Button>
                    <Icon type="upload" />
                    <div className="ant-upload-text">点击上传</div>
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={2}>

              <Divider type="vertical" />

            </Col>

            <Col span={11}>
              <Form.Item label="酒店报销金额">
                <InputMoneyAmount
                  value={this.budget.hotel}
                  onChange={(value) => { this.budget.hotel = value; }} />
              </Form.Item>

              <Form.Item label="车旅报销金额">
                <InputMoneyAmount
                  value={this.budget.vehicle}
                  onChange={(value) => { this.budget.vehicle = value; }} />
              </Form.Item>

              <Form.Item label="饮食报销金额">
                <InputMoneyAmount
                  value={this.budget.food}
                  onChange={(value) => { this.budget.food = value; }} />
              </Form.Item>

              <Form.Item label="其他报销金额">
                <InputMoneyAmount
                  value={this.budget.other}
                  onChange={(value) => { this.budget.other = value; }} />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ padding: '20px' }}>
            <Col span={8} />
            <Col span={3}>
              <Button type="primary" htmlType="submit"
              onClick={this.handleSubmit}>
                提交
              </Button>
            </Col>
            <Col span={2} />
            <Col span={3}>
              <Button type="default" htmlType="button"
              onClick={()=>history.push('/reimbursement-apply')}>
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

}
