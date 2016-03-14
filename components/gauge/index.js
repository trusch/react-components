import React from 'react';

import './gauge.styl';

export default class Gauge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateGauge(this.props.value);
  }

  componentDidUpdate() {
    this.updateGauge(this.props.value);
  }

  updateGauge(value){
    let scaleActiveColor = "#00c8ff";
    let degree    = (value/100) * 300;
    let degLeft   = (degree> 15) ? 1 : degree/15;
    let degRight  = (degree<285) ? 0 : (degree-285)/15;

    let fillLeft                        = this.refs.fillLeft;
    let fillRight                       = this.refs.fillRight;
    fillLeft.style['background-image']  = 'linear-gradient('+scaleActiveColor+' '+(degLeft*50)+'%, transparent 0%)';
    fillRight.style['background-image'] = 'linear-gradient(transparent '+(50-degRight*50)+'%, '+scaleActiveColor+' 0%)';

    let deg             = degree-15;
    if (degree<16)  deg = 0;
    if (degree>285) deg = 270;
    let sec2            = deg>90  ? scaleActiveColor : 'transparent';
    let sec3            = deg>180 ? scaleActiveColor : 'transparent';

    let spinner               = this.refs.spinner;
    spinner.style.borderColor = sec3 +' '+ sec2 +' '+ scaleActiveColor + ' transparent';
    spinner.style.transform   = 'rotate('+deg+'deg)';
  }

  render() {
    let classes   = "meter";
    let threshold = 50
    // Total Range: 276deg; Start Value: 42deg
    let degree    = threshold*2.76 + 42
    let style     = {transform: "rotate("+ degree +"deg)"};
    let unit      = this.props.unit ? this.props.unit : 'U/min';
    
    if(this.props.value <= 20) classes += ' warning';
    if(this.props.value >= 90) classes += ' danger';

    return(
      <div className="gauge-container">
        <div className="gauge-stepper">
          <div className="gauge-circle"></div>
          <div ref="spinner" className="gauge-spinner"></div>
          <div ref="target" style={style} className="gauge-target">
            <svg width="10" height="10">
              <path d="M4.98289,0L-0.0171086,5L9.98289,5L4.98289,0Z"></path>
            </svg>
          </div>
          <div className="cap left">
            <div className="semi left"></div>
            <div ref="fillLeft" className="fill left"></div>
          </div>
          <div className="cap right">
            <div className="semi right"></div>
            <div ref="fillRight" className="fill right"></div>
          </div>
          <div className="gauge-value">
            <p className="current">{this.props.value}</p>
            <p className="threshold">{threshold} {unit}</p>
          </div>
        </div>
      </div>
    );
  }
}
