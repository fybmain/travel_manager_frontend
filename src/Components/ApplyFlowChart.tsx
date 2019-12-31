import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { SVGPathArray } from 'highcharts';

// The wrapper exports only a default component class that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props). All other
// interfaces like Options come from the Highcharts module itself.

// const options: Highcharts.Options = {
// 	title: {
// 		text: 'My chart'
// 	},
// 	series: [{
// 		type: 'line',
// 		data: [1, 2, 3]
// 	}]
// }

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).

const colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
const App = (props: HighchartsReact.Props) => <div>
	<HighchartsReact
		highcharts={Highcharts}
		options={options}
		{...props}
	/>
</div>
export class ApplyFlowChart extends React.Component {

	render() {
		console.log(Highcharts.getOptions().colors);
		return <App />;
	}
}
const options: Highcharts.Options = {
	chart: {
		backgroundColor: 'white',
		events: {
			load: function () {
				// Draw the flow chart
				var ren = this.renderer;
				var rightArrow: SVGPathArray = ['M', 0, 0, 'L', 80, 0, 'L', 75, 5, 'M', 80, 0, 'L', 75, -5];
				ren.label('选择申请类型', 30, 20)
					.attr({
						fill: colors[0],
						stroke: 'white',
						'stroke-width': 2,
						padding: 5,
						r: 5
					}).css({
						color: 'white',
						fontSize: 'large',
						textAlign: 'center'
					})
					.add().shadow(true);
				ren.path(rightArrow)
					.attr({
						'stroke-width': 2,
						stroke: colors[3]
					})
					.translate(155, 40)
					.add();
				ren.label('填写申请表', 245, 20)
					.attr({
						fill: colors[0],
						stroke: 'white',
						'stroke-width': 2,
						padding: 5,
						r: 5
					}).css({
						color: 'white',
						fontSize: 'large',
						textAlign: 'center'
					})
					.add().shadow(true);
				ren.path(rightArrow)
					.attr({
						'stroke-width': 2,
						stroke: colors[3]
					})
					.translate(355, 40)
					.add();
				ren.label('提交申请', 445, 20)
					.attr({
						fill: colors[0],
						stroke: 'white',
						'stroke-width': 2,
						padding: 5,
						r: 5
					}).css({
						color: 'white',
						fontSize: 'large',
						textAlign: 'center'
					})
					.add().shadow(true);
				ren.path(rightArrow)
					.attr({
						'stroke-width': 2,
						stroke: colors[3]
					})
					.translate(535, 40)
					.add();
				ren.label('等待审批', 625, 20)
					.attr({
						fill: colors[0],
						stroke: 'white',
						'stroke-width': 2,
						padding: 5,
						r: 5
					}).css({
						color: 'white',
						fontSize: 'large',
						textAlign: 'center'
					})
					.add().shadow(true);
			}
		}
	},
	title: { text:"" }
}