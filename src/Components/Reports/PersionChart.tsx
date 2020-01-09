import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../../Stores/MainStore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Payment } from '../../Models';
import { observable } from 'mobx';
import { ReportApi } from '../../api/ReportApi';
import { message, Select, DatePicker, Card } from 'antd';
import moment from 'moment';

const { MonthPicker } = DatePicker;
interface PersonChartProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class PersonChart extends React.Component<PersonChartProps> {
  @observable payment: Payment = {
    food: 0,
    hotel: 0,
    other: 0,
    vehicle: 0,
  };
  @observable loadingStatus: boolean = true;
  @observable time: string;
  defaultTime: moment.Moment;

  constructor(props: PersonChartProps) {
    super(props);
    this.time = moment().format('YYYY-MM');
    this.defaultTime = moment();
    this.getPayment(this.time);
    console.log("constructor PersonalReport");
  }

  render() {
    return (
      <Card title="月度报销费用" className="card">
        <div style={{ marginLeft: 20 }}>
          <MonthPicker defaultPickerValue={this.defaultTime}
            defaultValue={this.defaultTime}
            onChange={(value: any, dateString: string) => {
              this.time = dateString;
              this.getPayment(this.time);
            }} />
        </div>
        {
          this.loadingStatus ?
            null
            : <HighchartsReact
              options={renderData(this.payment)}
              highcharts={Highcharts}
              {...this.props}
            />
        }
      </Card>
    );
  }

  getPayment = async (time: string) => {
    this.loadingStatus = true;
    const result = await ReportApi.getPersonalPayment({
      time: time
    });
    if (result.message === "ok") {
      this.payment = result.items as Payment;
    }
    else {
      message.error(result.message);
    }
    this.loadingStatus = false;
  }
}

const renderData = (payment: Payment) => {
  const sum = payment.food + payment.hotel + payment.other + payment.vehicle;
  let data = [
    {
      name: `饮食`,
      y: payment.food
    },
    {
      name: '酒店',
      y: payment.food
    },
    {
      name: '车旅',
      y: payment.vehicle
    },
    {
      name: '其他',
      y: payment.other
    },
  ];
  data.sort((a, b) => { return b.y - a.y });
  if (sum == 0) data = [{ name: '未报销', y: 0.001 }];
  const options: Highcharts.Options = {
    chart: {
      style: { height: 500, minWidth: 500 }
    },
    title: {
      text: '报销费用<br>占比',
      align: 'center',
      verticalAlign: 'middle',
      y: 70
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.name}费用<br>{point.y:.1f}元-<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0px 1px 2px black'
          }
        },
        startAngle: -90, // 圆环的开始角度
        endAngle: 90,    // 圆环的结束角度
        center: ['50%', '75%']
      }
    },
    series: [{
      type: 'pie',
      name: '报销费用占比',
      innerSize: '50%',
      data: data
    }],
  };
  return options;
}