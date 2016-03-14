import React      from "react";
import Chart      from "react-chartjs";
import {Col, Row} from '../../components/grid';
import Pager      from '../../components/pager';
import Viewfinder from '../viewfinder';
import './linechart.styl';

/*
  npm install react-chartjs --save
  chart options and data structure for each chart type accessible here: http://www.chartjs.org/docs/

  usable props:
    head              dom             /// dom structure for head of title view

    pager             bool            /// display pager
    pagerType         string          /// type of pager (simple, granular)
    pagerMin          number          /// minimum pager value
    pagerCur          number          /// current value of pager
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
    legendselectable  bool            ///

    viewfinder        bool            /// whether to show the viewfinder for the line chart or not (type is required to be 'line')
*/

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.resetViewfinder = 0;
    this.pagerCur        = this.props.pagerCur      || 0;
    this.selectorValue   = this.props.selectorValue || 10;
    this.selectorLabel   = this.props.selectorLabel || 'Select';
    this.selection       = this.props.selection     || [10, 20, 50, 100];
    this.state           = {
      dataSection: this.props.data,
      dataPage: this.props.data,
      submenuClosed: true,
      legend: null,
      from: 0,
      to: 0,
    };
  }

  componentWillReceiveProps(newProps) {
    this.updateData();
  }

  updateSection(section) {
    this.setState(section);
    this.updateData();
  }

  updateData() {
    let total           = this.props.data.labels ? this.props.data.labels.length : [];
    let pageFrom        = this.pagerCur     * this.selectorValue;
    let pageTo          = (this.pagerCur+1) * this.selectorValue;
    let sectionFrom     = pageFrom + this.state.from;
    let sectionTo       = pageTo   - this.state.to;
    let labelsPage      = [];
    let datasetsPage    = [];
    let labelsSection   = [];
    let datasetsSection = [];

    for (let i=0; i<total; i++) {
      if (i>=pageFrom && i<pageTo) {
        labelsPage.push(this.props.data.labels[i]);
        if (i>=sectionFrom && i<sectionTo) {
          labelsSection.push(this.props.data.labels[i]);
        }
      }
    }

    for (let dataset of this.props.data.datasets) {
      let datasetPage = {};
      let datasetSection = {};
      for (let index in dataset) {
        if (index==='data') {
          datasetPage.data = [];
          datasetSection.data = [];
          for (let i=0; i<total; i++) {
            if (!dataset.data[i]) continue;
            if (i>=pageFrom && i<pageTo) {
              datasetPage.data.push(dataset.data[i]);
              if (i>=sectionFrom && i<sectionTo) {
                datasetSection.data.push(dataset.data[i]);
              }
            }
          }
        } else {
          datasetPage[index] = dataset[index];
          datasetSection[index] = dataset[index];
        }
      }
      datasetsPage.push(datasetPage);
      datasetsSection.push(datasetSection);
    }

    this.setState({
      dataSection: {
        labels  : labelsSection,
        datasets: datasetsSection,
      },
      dataPage: {
        labels  : labelsPage,
        datasets: datasetsPage,
      },
    });
  }

  componentDidMount() {
    //let legend = this.generateLegend(this.state.dataSection.datasets);
    //this.setState({legend: legend});
    this.props.onChartMounted(50);
    this.updateData();
  }

  getChart(options) {
    let chart;
    switch (options.type) {
      case 'line':
        chart = <Chart.Line ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} redraw />;
        break;
      case 'bar':
        chart = <Chart.Bar ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} />;
        break;
      case 'doughnut':
        chart = <Chart.Doughnut ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} />;
        break;
      case 'pie':
        chart = <Chart.Pie ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} />;
        break;
      case 'radar':
        chart = <Chart.Radar ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} />;
        break;
      case 'polar':
        chart = <Chart.Polar ref="chart" data={options.data} options={options.options} width={options.width} height={options.height} />;
        break;
    }
    return chart;
  }

  generateLegend(data) {
    let legend = [];
    for (let i = 0; i < data.length; i++) {
      let style = ({backgroundColor: data[i].fillColor});
      let kind  = data[i].label == 'umtsRssi' ? '' : ' in °C';
      legend.push(
        <li key={i} ref="legend-item">
          <span className="color-bullet" style={style}></span>
          <span>{data[i].label+kind}</span>
        </li>
      );

      if (i == data.length -1) {
        return legend;
      }
    }
  }

  generateSelector() {
    let dropdownClasses = "dropdown" + (this.state.submenuClosed ? "" : " open");
    return  <div className="wrapper-dropdown" onClick={this.toggleSubmenu.bind(this)}>
              <span>{this.selectorLabel}</span>
              <ul className={dropdownClasses}>
                {this.generateSelection(this.selection)}
              </ul>
            </div>;
  }

  generateSelection(array) {
    let lis = [];
    let options = {};

    for (let i = 0; i < array.length; i++) {
      let className = (array[i]===this.selectorValue) ? 'selected' : '';
      options = {
        type: 'selector',
        value: array[i],
        key: i,
      };

      lis.push(
        <li key={i} ref={i} className={className} onClick={this.selectorCallback.bind(this, options)}>
          {array[i]}
        </li>
      );

      if (i == array.length-1) {
        return lis;
      }
    }
  }

  generateSwitchUnit() {
    return  <Col xs={4} sm={4} md={4} lg={4}>
              <div className="chart-switcher">
                <p>{this.props.switchLeftLabel ? this.props.switchLeftLabel : ''}</p>
                <div className="switch" onClick={this.switchCallback.bind(this)}>
                  <input className="cmn-toggle cmn-toggle-round" ref="switchInput"></input>
                  <label></label>
                </div>
                <span>>{this.props.switchRightLabel ? this.props.switchRightLabel : ''}</span>
              </div>
            </Col>;
  }

  generateViewfinder() {
    return  <Viewfinder
              reset={this.resetViewfinder}
              chartOverview={this.getChart(this.getOverviewOptions())}
              selectorValue={this.selectorValue}
              updateSection={this.updateSection.bind(this)} />;
  }

  generatePager() {
    let length = this.props.data.labels.length ? this.props.data.labels.length : [];
    return  <Pager
              min={0}
              max={length/this.selectorValue-1}
              cur={this.pagerCur}
              content={this.generateViewfinder()}
              btnleft={'<'}
              btnright={'>'}
              leftlabel="Previous"
              rightlabel="Next"
              incCallback={()=>{this.pagerIncCallback()}}
              decCallback={()=>{this.pagerDecCallback()}}/>;
  }

  toggleSubmenu() {
    this.setState({
      submenuClosed: !this.state.submenuClosed,
    });
  }

  selectorCallback(payload) {
    this.pagerCur = 0;
    this.selectorValue = payload.value;
    this.stepsize = this.maxX/(this.selectorValue-1);
    this.setState({from: 0, to: 0});
    this.updateData();
    this.resetViewfinder++;
    //this.props.selectorCallback(payload);
  }

  pagerDecCallback(payload) {
    this.pagerCur--;
    this.updateData();
    //this.props.pagerCallback({type: 'pager', value: this.pagerCur});
  }

  pagerIncCallback(payload) {
    this.pagerCur++;
    this.updateData();
    //this.props.pagerCallback({type: 'pager', value: this.pagerCur});
  }

  switchCallback() {
    this.props.switchCallback({type: 'switch', value: this.refs.switchInput.hasClass('checked') ? true : false})
  }

  getSectionOptions() {
    return {
      type: this.props.type,
      //data: this.state.dataSection,
      data: this.props.data,
      width: this.props.width,
      height: this.props.height,
      options: this.props.options,
    };
  }

  getOverviewOptions() {
    return {
      type: this.props.type,
      width: this.props.width,
      data: this.state.dataPage,
      height: '100px',
      options: {
        bezierCurve: true,
        datasetFill: false,
        responsive: true,
        scaleShowGridLines: true,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        showTooltips: false,
        showScale: false,
        animation: false,
        pointDot: false,
        scaleLineColor: "rgba(255,255,255,.3)",
        scaleGridLineColor : "rgba(255,255,255,.3)",
      },
    };
  }

  render() {
    let head         = this.props.head || null,
        total        = this.props.data.labels ? this.props.data.labels.length : [],
        pager        = this.props.pager    ? this.generatePager() : this.generatePager(),
        selector     = this.selection      ? this.generateSelector() : null,
        switchUnit   = this.props.switch   ? this.generateSwitchUnit() : null,
        legend       = this.props.legend   ? this.generateLegend(this.state.dataSection.datasets) : null,
        chartSection = this.getChart(this.getSectionOptions());

    return (
      <div className="chart-line">
        <div className="graph-container">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="chart-header">
                {head}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              {chartSection}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="chart-legend">
                <ul>
                  {legend}
                </ul>
              </div>
            </Col>
            <Col xs={4} sm={3} md={2} lg={1}>
              <div className={pager !== null || selector !== null ? "time-switcher" : ""}>
                {selector}
              </div>
            </Col>
            {switchUnit}
          </Row>
          {pager}
        </div>
      </div>
    );
  }
};
