import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// The wrapper exports only a default component class that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props). All other
// interfaces like Options come from the Highcharts module itself.
const options: Highcharts.Options = {
  title: {
		text: '',
		style: {
			color: 'black'
		},
	},
	chart: {
		backgroundColor: 'white',
		events: {
			load() {
				// Draw the flow chart
        const ren = this.renderer;
        const	colors = Highcharts.getOptions().colors;
        if(colors===undefined){
          return;
        }
        const rightArrow: Highcharts.SVGPathArray = ['M', 0, 0, 'L', 150, 0, 'L', 145, 5, 'M', 150, 0, 'L', 145, -5];
        // const leftArrow: Highcharts.SVGPathArray = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

        let posx = 158;
        for(let i=0;i<3;i++){
          ren.path(rightArrow)
            .attr({
            'stroke-width': 2,
            stroke: colors[1]
          })
          .translate(posx, 75)
          .add();
          posx += 300;
        }

        const texts = ['员工提出申请', '待部门经理审核', '待总经理审核', '审核完成'];
        posx = 10;
        for(let i=0;i<4;i++){
          ren.label(texts[i], posx, 50)
          .attr({
            fill: colors[0],
            stroke: 'white',
            'stroke-width': 2,
            padding: 5,
            r: 5
          })
          .css({
            color: 'white',
            fontSize: '30px',
          })
          .add()
          .shadow(true);
          posx += 300;
        }
			}
		}
	},
};

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).
export class ApproveFlowChart extends React.Component {
  /*
  constructor(props: HighchartsReact.Props) {
    super(props);
  }
  */

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          {...this.props}
        />
      </div>
    )
  }
}
