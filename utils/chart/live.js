import React, {Component} from 'react';
import { LineChart }      from 'react-d3';
import './live.styl';

export default class LineGraph extends Component {

  constructor(props, context) {
    super(props);
    this.span    = 326; // timespan in ms for simalator 'getLineData' and 'generateBuffer'
    this.records = 50;  // number of datasets shown on the chart
    this.colors  = ["#25BDFF", "#ea1f74", "#FFB100", "#7894AF", "#CCAD8F", "#cc6699", "#ffffff", "#a4fade", "#fea59d"];
    this.start   = Date.now();

    let idx;
    let lineData = [];
    for (idx in props.data) {
      lineData.push({
        name  : props.data[idx].id,
        values: this.generateBuffer()
      });
    }
    this.state = {lineData: lineData};
  }

  generateBuffer() {
    let i, x;
    let values = [];
    for (i = 0; i<this.records; i++) {
      x = i * this.span / 1000;
      values.push({x: x, y: 0});
    }
    return values;
  }

  componentWillReceiveProps(newProps) {
    let i, values, value, diff;
    let lineData = this.state.lineData;
    for (i = 0; i < lineData.length; i++) {
      values = lineData[i].values; 
      if (values.length === this.records) {
        values.shift();
      }
      if (newProps){
        value = newProps.data[i].value;
      } else {
        diff  = Math.random() < 0.4 ? -1200 : 800
        value = values[values.length-1].y + diff;
      }
      values.push({x: this.getTime(), y: value});
      if (i == lineData.length-1) {
        this.setState({lineData: lineData});
      }
    }
  }

  getTime() {
    let time = Date.now();
    let buff = 50 * this.span;
    let diff = time - this.start
    return (diff + buff) / 1000;
  }

  getLineData() {
    let self = this;
    setTimeout(function() {
      self.componentWillReceiveProps();
    }, this.span);
  }

  colorAccessorFunc(series, idx) {
    return this.colors[idx];
  }

  generateLegend(data) {
    let i, label, style, kind;
    let legend = [];
    for (i = 0; i < data.length; i++) {
      label = data[i].id;
      style = ({backgroundColor: this.colors[i]});
      kind  = (label == 'umtsRssi') ? '' : ' in °C';
      legend.push(
        <li key={i} ref="legend-item">
          <span className="color-bullet" style={style}></span>
          <span>{label + kind}</span>
        </li>
      );
      if (i == data.length - 1) {
        return legend;
      }
    }
  }

  render() {
    this.getLineData();
    let legend    = this.props.legend ? this.generateLegend(this.props.data) : null;
    let gridColor = 'rgba(255,255,255,.3)';
    let settings  = {x: 0, y: 0, width: 525, height: 250};
    let margins   = {top: 0, bottom: 25, left: 75, right: 15};

    return (
      <div>
        <lineGraph>
          <LineChart
            data={this.state.lineData}
            width={600}
            height={275}
            legend={false}
            colors={(f)=>{return f}}
            margins={margins}
            circleRadius={0}
            viewBoxObject={settings}
            colorAccessor={this.colorAccessorFunc.bind(this)}
            gridHorizontal={true}
            gridHorizontalStroke={gridColor}
            gridHorizontalStrokeDash={'1, 0'}
          />
        </lineGraph>
          <div className="chart-legend">
            <ul>{legend}</ul>
          </div>
      </div>
    );
  }
}
