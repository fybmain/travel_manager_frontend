import React from 'react';
import { message, DatePicker, Card } from 'antd';
import moment from 'moment';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { ReportApi } from '../../api/ReportApi';

const { MonthPicker } = DatePicker;

interface DepartmentPercentileChartProps {
}

type CostType = 'all' | 'food' | 'hotel' | 'other' | 'vehicle';

interface PieData {
  name: string;
  y: number;
  z: number;
}

@inject("mainStore") @observer
export class DepartmentPercentileChart extends React.Component<DepartmentPercentileChartProps> {
  @observable loadingStatus: boolean = true;
  @observable time: string;
  defaultTime: moment.Moment;
  @observable data: PieData[] = [];

  constructor(props: DepartmentPercentileChartProps) {
    super(props);
    this.defaultTime = moment().add(-1, 'month');
    this.time = this.defaultTime.format('YYYY-MM');
    this.updateData();
  }

  render() {
    return (
      <Card title="各部门报销金额对比图"  className="card">
        <span style={{marginLeft:20}}>
          <label>&nbsp;&nbsp;&nbsp;时间：</label>
          <MonthPicker defaultPickerValue={this.defaultTime}
            defaultValue={this.defaultTime}
            onChange={(value: any, dateString: string) => {
              this.time = dateString;
              this.updateData();
            }} />
        </span>
        {
          this.loadingStatus ?
            null
            : <HighchartsReact
              options={this.renderData(this.data)}
              highcharts={Highcharts}
              {...this.props}
            />
        }
      </Card>
    );
  }

  updateData = async () => {
    this.loadingStatus = true;
    console.log("updateData")
    const result = await ReportApi.getDepartmentPercentile({
      startTime: this.time,
      endTime: this.time,
    });
    if (result.message === "ok") {
      const data = result.items as { cost: number; departmentName: string; }[];
      this.data = data.map((value, index) => {
        return {
          name: value.departmentName,
          z: Number(value.cost),
          y: Number(value.cost),
        }
      })
    }
    else {
      message.error(result.message);
    }
    this.loadingStatus = false;
  }

  renderData = (data: PieData[]) => {
    const options: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: undefined
      },
      // colors:['rgb(128, 133, 233)', 'rgb(223, 83, 83)', 'rgb(124,181,236)', 
      // 'rgb(170,238,238)', 'rgb(255,108,108)', 'rgb(238,170,238)', 
      // '#55BF3B'],
      colors:['#cc9999','#0099cc','#ff6666','#ffff66','#99cc66','#ffcc00','#ffcc99','#66cccc',
      '#ffcc33','#663399','#FF9933'],
      legend: {
        itemDistance: 30,//距离
        symbolWidth: 12,  //设置为正方形
        symbolHeight: 12,
        symbolRadius: 0,
        itemStyle: {
          fontSize:"16px"
        }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  distance: 30,
                  format:'<b>{point.name}<br/>{point.percentage:.1f}%</b>',
                  style: {
                    fontSize:'15px',
                  },
                 
              },
              showInLegend: true
          
          }
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          '总花费: <b>{point.y}元</b><br/>'
      },
      series: [{
        type: 'pie',
        //minPointSize: 10,
        innerSize: '20%',
        //zMin: 0,
        name: 'countries',
        data: data,
      }]
    };
    return options;
  }
}