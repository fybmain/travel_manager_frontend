import React from 'react';
import { DatePicker, message, Card } from 'antd';
import moment from 'moment';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import chinaJson from 'echarts/map/json/china.json'

import { ReportApi } from '../../api/ReportApi';
import { MainStore } from '../../Stores/MainStore';
import { MapData } from '../../Models/Report';

interface MapChartProps {
  mainStore: MainStore;
}

const { MonthPicker } = DatePicker;
@inject("mainStore") @observer
export class MapChart extends React.Component<MapChartProps> {
  @observable loadingStatus: boolean = true;
  @observable time: string;
  defaultTime: moment.Moment;
  @observable data: MapData[] = [];
  maxCount: number = 0;

  constructor(props: MapChartProps) {
    super(props);
    echarts.registerMap('china', chinaJson);
    this.defaultTime = moment().add(-1, 'month');
    this.time = this.defaultTime.format('YYYY-MM');
    this.updateData();
  }

  render() {
    return (
      <Card title="各省出差次数对比图" className="card-map">
        <span style={{ marginLeft: 20 }}>
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
            : <ReactEcharts
              option={this.updateOption(this.data)}
              style={{ width: '100%', height: '600px' }}
            />
        }
      </Card>
    )
  }
  updateData = async () => {
    this.loadingStatus = true;
    const result = await ReportApi.getLocationDiagram({
      startTime: this.time,
      endTime: this.time,
    });
    if (result.message === "ok") {
      const items = result.items as MapData[];
      this.data = items;
      let maxSize = 0;
      items.forEach((value) => { if (maxSize < value.value) maxSize = value.value });
      this.maxCount = maxSize;

    }
    else {
      message.error(result.message);
    }
    this.loadingStatus = false;
  }

  updateOption = (data: MapData[]) => {
    const option = {
      registerMap: chinaJson,
      tooltip: {
        formatter: (p: any) => {
          if (p.data && p.data.cityAndTimes) {
            const cities = p.data.cityAndTimes as { city: string, count: number }[];
            const cities2 = cities.sort((a, b) => b.count - a.count);
            const x: string[] = cities2.map((value: { city: string, count: number }) => {
              return value.city + " " + value.count;
            });
            return "总计："+p.data.value+"<br/>"+x.join("<br/>");
          }
          return "";
        }

      },
      visualMap: {
        min: 0,
        max: this.maxCount,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#e0ffff', '#006edd']
        }
      },

      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#F06C00'
        }
      },

      series: [
        {
          name: '信息量',
          type: 'map',
          mapType: 'china',
          data: data,
        }
      ]
    };
    return option;
  }
}