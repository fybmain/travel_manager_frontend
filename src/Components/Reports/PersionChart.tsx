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
          <br /><br /><br />
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
  let data = [payment.food, payment.hotel, payment.vehicle, payment.other];
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
      categories: ['饮食', '酒店', '车旅', '其他'],
      crosshair: true,
      labels: {
        style: {
          fontSize: '16px'
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
          fontSize: '16px'
        }
      },
    },
    legend: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format:'<b>{point.y:.1f}元</b>',
          style: {
            fontSize:'15px',
          },
         
      },
      showInLegend: true
      }
    },
    series: [{
      type: 'column',
      name: '报销金额',
      data: data
    }]
  };
  return options;
}