import React, {Component} from 'react';

import { LineChart } from 'react-d3';
import Chart from './chart.js';

export default class LineGraph extends Component {

  constructor(props, context) {
    super(props. context);
    /*{
          name: "series1",
          values: [ { x: 0, y: 20 }],
          strokeWidth: 3,
          strokeDashArray: "5,5",
          fill: "red"
        }
    */
    this.state = {
      lineData: [
        {
          name: "series1",
          values: [ { x: 0, y: 20 }],
          fill: "rgba(250,187,205,0.2)"
        },
        {
          name: "series2",
          values: [ { x: 0, y: 0 }],
          fill: "rgba(220,220,220,0.2)"
        }
      ]
    }
  }

  getLineData() {
    let lineData = this.state.lineData;
    let self = this;
    setTimeout(function() {
      for(let i = 0; i < lineData.length; i++) {
        if(lineData[i].values.length === 50) {
          lineData[i].values.shift();
        }
        let time = lineData[i].values[lineData[i].values.length - 1].x + 10;
        let value = lineData[i].values[lineData[i].values.length - 1].y + (Math.random() < 0.4 ? -12 : 8);
        lineData[i].values.push({ x: time, y: value });
        if(i == lineData.length-1) {
          self.setState({lineData: lineData});
        }
      }
    }, 5000);
  }

  render() {
    let lineData = this.state.lineData;
    this.getLineData();
    let viewBoxObject = {x: 0, y: 0, width: 500, height: 400};
    return (
      <lineGraph>
        <Chart />
          {/*<Line data={this.state.data} options={this.state.options}/>*/}
          <LineChart
            legend={true}
            data={lineData}
            width='100%'
            height={400}
            viewBoxObject={viewBoxObject}
            title="Line Chart"
            yAxisLabel="Altitude"
            xAxisLabel="Elapsed Time (sec)"
            gridHorizontal={true}
          />

      </lineGraph>
    );
  }
}
