import React from 'react';
import { Form, Upload, Icon, Button, Divider, Row, Col, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { FormComponentProps } from 'antd/lib/form';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import history from '../history';
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

  constructor(props: ReimbursementApplyCreatePageProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["申请", "报销申请", "创建"];
    const searchParams = new URLSearchParams(history.location.search);
    const applyId=searchParams.get('applyId') as string;
    this.applyId = parseInt(applyId);
  }

  handleFinish = () => {
    history.push('/reimbursement-apply');
  }

  render() {

    return (
      <div className="tablePage">
        <ReimbursementApplyCreateForm
          applyId={this.applyId}
          onSuccess={this.handleFinish}
          onCancel={this.handleFinish}/>
      </div>
    );
  }
}

interface ReimbursementApplyCreateFormProps extends FormComponentProps {
  applyId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

@observer
class ReimbursementApplyCreateFormProto extends React.Component<ReimbursementApplyCreateFormProps> {
  @observable private fileList: UploadFile[] = [];

  handleImageListChange = (param: UploadChangeParam<UploadFile<any>>) => {
    const file = param.file;
    if(file.status==="error"){
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
    this.fileList = param.fileList.filter((value) => (value.status!=="error"));
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if(!err){
        if(this.fileList.length<=0){
          message.warning("请至少上传一张发票照片");
        }
        if(this.fileList.findIndex((value: UploadFile) => (value.status==="uploading"))>=0){
          message.warning("请等待图片上传完毕");
          return;
        }

        const pictureIdList = (
          this.fileList
          .filter((value: UploadFile) => (value.status==="done"))
          .map((value: UploadFile) => (value.response.data.pictureId))
        );
        const result = await ReimbursementApi.createReimbursementApply({
          travelApplyId: this.props.applyId,
          pictureIds: pictureIdList,
          payment: {
            hotel: values.hotelBudget,
            vehicle: values.vehicleBudget,
            food: values.foodBudget,
            other: values.otherBudget,
          },
        });
        if(result.message === "ok") {
          message.success("创建成功");
          if(this.props.onSuccess){
            this.props.onSuccess();
          }
        }else{
          message.error(result.message);
        }
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 12 },
      },
    };
    /*
    const tailItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      },
    };
    */
    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        layout="horizontal"
        labelAlign="left">
        <div style={{ paddingTop: "50px" }} />

        <Row>
          <Col span={2}/>
          <Col span={11}>
            <Form.Item label="申请人">
              <p style={{ textAlign: "left" }}>{UserInfoStore.userInfo.name}</p>
            </Form.Item>

            <Form.Item label="出差申请编号">
              <p style={{ textAlign: "left" }}>{this.props.applyId}</p>
            </Form.Item>

            <Form.Item label="发票上传" wrapperCol={{span:16}}>
              <Upload
                name="file"
                action="/api/image/upload"
                fileList={this.fileList}
                onChange={this.handleImageListChange}
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
              {
                this.props.form.getFieldDecorator('hotelBudget', {
                  rules: [
                    {
                      required: true,
                      message: '酒店报销金额不能为空',
                    },
                  ]
                })(
                  <InputMoneyAmount/>
                )
              }
            </Form.Item>

            <Form.Item label="车旅报销金额">
              {
                this.props.form.getFieldDecorator('vehicleBudget', {
                  rules: [
                    {
                      required: true,
                      message: '车旅报销金额不能为空',
                    },
                  ]
                })(
                  <InputMoneyAmount/>
                )
              }
            </Form.Item>

            <Form.Item label="饮食报销金额">
              {
                this.props.form.getFieldDecorator('foodBudget', {
                  rules: [
                    {
                      required: true,
                      message: '饮食报销金额不能为空',
                    },
                  ]
                })(
                  <InputMoneyAmount/>
                )
              }
            </Form.Item>

            <Form.Item label="其他报销金额">
              {
                this.props.form.getFieldDecorator('otherBudget', {
                  rules: [
                    {
                      required: true,
                      message: '其他报销金额不能为空',
                    },
                  ]
                })(
                  <InputMoneyAmount/>
                )
              }
            </Form.Item>

          </Col>
        </Row>

        <Row style={{ padding: '20px' }}>
          <Col span={8} />
          <Col span={3}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Col>
          <Col span={2} />
          <Col span={3}>
            <Button
              type="default"
              htmlType="button"
              onClick={() => {if(this.props.onCancel){this.props.onCancel();}}}>
              取消
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const ReimbursementApplyCreateForm = Form.create<ReimbursementApplyCreateFormProps>({ name: 'reimbursementApplyCreate' })(ReimbursementApplyCreateFormProto);
