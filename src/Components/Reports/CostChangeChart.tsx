import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../../Stores/MainStore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { observable } from 'mobx';
import { ReportApi } from '../../api/ReportApi';
import { message, Select, Card, Row, Col } from 'antd';
import moment from 'moment';
import { DepartmentSelector } from '../DepartmentSelector';
import { payBudgetDiffInfo } from '../../Models/Report';

const { Option } = Select;

interface CostChangeChartProps {
  mainStore: MainStore;
}

type CostType = 'all' | 'food' | 'hotel' | 'other' | 'vehicle';

@inject("mainStore") @observer
export class CostChangeChart extends React.Component<CostChangeChartProps> {
  @observable loadingStatus: boolean = true;
  @observable departmentId: number = -1;
  costType: CostType = 'all';
  startTime = moment().add(-1, "years");
  startTimeStr = this.startTime.format('YYYY-MM');
  endTimeStr = moment(this.startTime).add(11, "months").format('YYYY-MM');
  data: payBudgetDiffInfo = {
    all: {
      budget: [],
      payment: []
    },
    food: {
      budget: [],
      payment: []
    },
    hotel: {
      budget: [],
      payment: []
    },
    other: {
      budget: [],
      payment: []
    },
    vehicle: {
      budget: [],
      payment: []
    }
  }
  paymentData: number[] = [];
  budgetData: number[] = [];
  categories: string[] = [];

  constructor(props: CostChangeChartProps) {
    super(props);
    for (let i = 0; i < 12; i++) {
      this.categories.push(moment(this.startTime).add(i, 'months').format('YYYY-MM'));
    }
    this.updateSourceData();
    console.log("constructor CostChangeChart");
  }

  handleSelectChange = (value: string) => {
    this.costType = value as CostType;
    this.updateData();
  }

  render() {
    return (
      <Card title="过去一年预算与实际费用对比图" className="card">
        <div style={{ display: "inline", width: 100, height: 30, marginLeft: 30 }}>
          <label>&nbsp;&nbsp;&nbsp;费用类型：</label>
          <Select
            style={{ width: 120 }}
            defaultValue={'all'}
            onChange={this.handleSelectChange}
            key="select">
            <Option value="all">所有</Option>
            <Option value="food">饮食</Option>
            <Option value="hotel">酒店</Option>
            <Option value="vehicle">车旅</Option>
            <Option value="other">其他</Option>
          </Select>
        </div>
        <div style={{ display: "inline", width: 100, height: 30 }}>
          {
            this.props.mainStore.breadcrumb[1] === "公司报表" ?
              <DepartmentSelector changeSelect={this.changeSelect} />
              : null
          }</div>
        <br /><br />
        {
          this.loadingStatus ?
            null
            : <HighchartsReact
              options={this.renderData()}
              highcharts={Highcharts}
              {...this.props}
            />
        }
      </Card>
    );
  }

  updateSourceData = async () => {
    this.loadingStatus = true;
    const result = await ReportApi.getPayBudgetDiff({
      startTime: this.startTimeStr,
      endTime: this.endTimeStr,
      departmentId: this.departmentId
    });
    if (result.message === "ok") {
      this.data = result.items as payBudgetDiffInfo;
    }
    else {
      message.error(result.message);
    }
    this.updateData();
  }

  updateData = () => {
    this.loadingStatus = true;
    this.paymentData = this.data[this.costType].payment.map(value => Number(value));
    this.budgetData = this.data[this.costType].budget.map(value => Number(value));
    this.loadingStatus = false;
  }

  changeSelect = (id: number) => {
    this.departmentId = id;
    this.updateSourceData();
  }

  renderData = () => {
    const options: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ""
      },
      xAxis: {
        categories: this.categories,
        crosshair: true,
        labels: {
          style: {
            fontSize: '16px'  //字体
          }
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '<span style="font-size:16px">费用 (元)</span>'
        },
        labels: {
          style: {
            fontSize: '16px'  //字体
          }
        },
      },
      legend: {
        itemDistance: 30,//距离
        symbolWidth: 12,  //设置为正方形
        symbolHeight: 12,
        symbolRadius: 0,
        itemStyle: {
          fontSize: "16px"
        },
      },
      tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          borderWidth: 0
        }
      },
      series: [{
        type: 'column',
        name: '预算',
        data: this.budgetData
      }, {
        type: 'column',
        name: '报销',
        data: this.paymentData
      },]
    };
    return options;
  }
}