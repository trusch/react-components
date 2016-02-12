import React      from "react";
import Chart      from "react-chartjs";
import {Col, Row} from '../../components/grid';
import Pager      from '../../components/pager';

import './linechart.styl';

/*
  npm install react-chartjs --save
  chart options for each chart type accessible here: http://www.chartjs.org/docs/

  usable props:
    head              dom             /// dom structure for head of title view

    pager             bool            /// display pager
    pagerType         string          /// type of pager (simple, granular)
    pagerMin          number          /// minimum pager value
    pagerCur          number          /// curretn value of pager
    pagerMax          number          /// maximum pager value
    pagerCallback     func            /// function to be triggered on pager change with page number in payload

    switch            bool            /// switch at the bottom right corner of the graph 
    switchLeftLabel   string          /// left label of the switch
    switchRightLabel  string          /// right label of the switch
    switchCallback    func            /// function to be triggered on switch change with bool true/false in payload

    selector          bool            /// show dropdown selector
    selectorLabel     string          /// selector label / placeholder
    selectorValue     string/number   /// selector value instead of label
    selection         array           /// array of selectable value for selector
    selectorCallback  func            /// function to be triggered on selector change with value of selection in payload

    type              string          /// what type of graph is requested ('line', 'bar', 'doughnut', 'pie', 'radar', 'polar')
    data              array(object)   /// array of data objects for lines to be displayed in graph
    options           object          /// global options for graph
    width             number          /// width of graph
    height            number          /// height of graph

    legend            bool            /// whether to display a legend or not. For a legend to be rendered it is necessary that the graph datasets have a label property
    legendselecteble  bool            ///

    viewfinder        bool            /// whether to show the viewfinder for the line chart or not (type is required to be 'line')
*/

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submenuClosed: true,
      legend: null
    };
    this.pagerValue = 0;
  }

  componentDidMount() {
    let legend = this.refs.chart.getChart().generateLegend();
    this.setState({legend: legend});
  }

  getChart(type) {
    let chart;

    switch (type) {
      case 'line':
        chart = <Chart.Line ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
      case 'bar':
        chart = <Chart.Bar ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
      case 'doughnut':
        chart = <Chart.Doughnut ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
      case 'pie':
        chart = <Chart.Pie ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
      case 'radar':
        chart = <Chart.Radar ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
      case 'polar':
        chart = <Chart.Polar ref="chart" data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />;
        break;
    }
    return chart;
  }

  toggleSubmenu() {
    let state = this.state.submenuClosed;
    if(state === true) {
      state = false;
    } else {
      state = true;
    }
    this.setState({submenuClosed: state});
  }

  generateLegend() {
    let legend = [];
    let data   = this.props.data.datasets;
    for(let i = 0; i < data.length; i++) {
      let style = ({backgroundColor: data[i].fillColor});
      legend.push(
        <li key={i} ref="legend-item"><span className="color-bullet" style={style}></span><span>{data[i].label}</span></li>
      );

      if(i == data.length -1) {
        return legend;
      }
    }
  }

  generateSelector() {
    let selection = this.props.selection  || [];
    let selector  = <div className="wrapper-dropdown">
                  <span onClick={this.toggleSubmenu.bind(this)}>{this.props.selectorLabel ? this.props.selectorLabel : 'Select'}</span>
                  <ul className={dropdownClasses}>
                    {this.generateSelection(selection)}
                  </ul>
                </div>;
    return selector;
  }

  generateSelection(array) {
    let lis = [];

    for(let i = 0; i < array.length; i++) {
      lis.push(<li key={i} ref={i} onClick={this.selectorCallback({type: 'selector', value: array[i], key: i})}>{array[i]}</li>);

      if(i == array.length-1) {
        return lis;
      }
    }
  }

  generateSwitchUnit() {
    let switchUnit = <Col xs={4} sm={4} md={4} lg={4}>
      <div className="chart-switcher">
        <p>{this.props.switchLeftLabel ? this.props.switchLeftLabel : ''}</p>
        <div className="switch" onClick={this.switchCallback.bind(this)}>
          <input className="cmn-toggle cmn-toggle-round" ref="switchInput"></input>
          <label></label>
        </div>
        <span>>{this.props.switchRightLabel ? this.props.switchRightLabel : ''}</span>
      </div>
    </Col>;

    return switchUnit;
  }

  generatePager() {
    let pager,
        pagerMin      = this.props.pagerMin || 0,
        pagerCur      = this.props.pagerCur || 0,
        pagerMax      = this.props.pagerMax || 999;

    pager = <Pager min={pagerMin} cur={pagerCur} max={pagerMax} btnleft={'<'} btnright={'>'} incCallback={()=>{this.pagerIncCallback()}} decCallback={()=>{this.pagerDecCallback()}}/>;
    return pager;
  }

  selectorCallback(payload) {
    this.props.selectorCallback(payload);
  }

  pagerDecCallback(payload) {
    this.pagerValue = this.pagerValue - 1;
    this.props.pagerCallback({type: 'pager', value: this.pagerValue});
  }

  pagerIncCallback(payload) {
    this.pagerValue = this.pagerValue + 1;
    this.props.pagerCallback({type: 'pager', value: this.pagerValue});
  }

  switchCallback() {
    this.props.switchCallback({type: 'switch', value: this.refs.switchInput.hasClass('checked') ? true : false})
  }

  render() {
    let dropdownClasses = "dropdown" + (this.state.submenuClosed ? "" : " open"),
        selector        = this.props.selector ? this.generateSelector() : null,
        head            = this.props.head                                     || null,
        pager           = this.props.pager    ? this.generatePager()           : null,
        legend          = this.props.legend   ? this.generateLegend()          : null,
        switchUnit      = this.props.switch   ? this.generateSwitchUnit()      : null,
        chart           = this.props.type     ? this.getChart(this.props.type) : null;

    this.pagerValue = this.props.pagerCur || this.pagerValue;

    return (
      <div className="chart-line">
        <div className="graph-container">
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="chart-header">
                {head}
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="time-switcher">
                {pager}
                {selector}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              {chart}
            </Col>
          </Row>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="chart-legend">
                <ul>
                  {legend}
                </ul>
              </div>
            </Col>
            {switchUnit}
          </Row>
        </div>
      </div>
    );
  }
};
