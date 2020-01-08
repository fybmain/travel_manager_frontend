import React from 'react';
import { inject, observer } from 'mobx-react';

import { MainStore } from '../../Stores/MainStore';

import ReactEcharts from 'echarts-for-react';

import chinaJson from 'echarts/map/json/china.json'

import echarts from 'echarts';

interface CompanyReportProps {
  mainStore: MainStore;
}

@inject("mainStore") @observer
export class CompanyReport extends React.Component<CompanyReportProps> {
  constructor(props: CompanyReportProps) {
    super(props);
    this.props.mainStore.breadcrumb = ["统计", "公司报表"];
    this.getOption = this.getOption.bind(this);
    echarts.registerMap('china', chinaJson);
  }


  getOption() {
    const option = { // 进行相关配置   
      registerMap: chinaJson,
      tooltip: {
        formatter: (p:any)=> {
          // TODO 在这里加一个列表显示这个城市的出差情况
          if (p.data && p.data.cityAndTimes) {
            return p.data.cityAndTimes[0].city+" " + p.data.cityAndTimes[0].count;
          }
          return "";
        }

      },
      visualMap: {
        min: 0,
        max: 2000,
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
          data: this.renderData()
        }
      ]
    };
    return option;
  }

  render() {

    return (
      <div className="card-margin">
        <ReactEcharts
          option={this.getOption()}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    )
  }

  // TODO 改数据格式
  renderData() {
    return  [
      {
          "name": "湖北",
          "value": 17,
          "cityAndTimes": [
              {
                  "city": "武汉",
                  "count": 17
              }
          ]
      },
      {
          "name": "湖南",
          "value": 1,
          "cityAndTimes": [
              {
                  "city": "湘潭",
                  "count": 1
              }
          ]
      }]

  }
}