
import React from 'react';

import './scale.styl';

export default class Scale extends React.Component {
  static propTypes = {
    location: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  changeHandler(event) {
    //this.setState({value: event.value});
  }
  
  render() {
    let min = (this.props.min) ? this.props.min : 0;
    let max = (this.props.max) ? this.props.max : 100;
    let middle = parseInt((max - min) / 2);
    let thrPerc = (this.props.threshold) ? this.props.threshold/max*100 : 50;
    let valPerc = parseInt(this.props.value/max*100);

    let classes = "rangeScale-active monitor";
    if (valPerc < thrPerc-10) classes += ' warning';
    if (valPerc > thrPerc+10) classes += ' danger';
    if (valPerc>=100) {
      valPerc = 100;
      classes += ' max';
    }

    let value = (this.props.value/max)*100 || 0;
    let style = "";
    let pointer = "";
    let className = "rangeScale";
    if (this.props.type=="vertical") {
      style = ({height: valPerc+'%'});
      pointer = ({bottom: thrPerc+'%'});
      className += " vertical";
    } else {
      style = ({width: valPerc+'%'});
      pointer = ({left: thrPerc+'%'});
    }

    let i, pos, size, styleMarks;
    let marks = [];
    for (i = 0; i<9; i++) {
      pos = i*100/8;
      
      if (i==0 || i==4 || i==8) size = 8;
      else if (i==2 || i==6) size = 5;
      else size = 2;

      if (this.props.type=="vertical") {
        styleMarks = ({top: pos+"%", width: size+"px"});
      } else {
        styleMarks = ({left: pos+"%", height: size+"px"})
      }
      marks.push(<span key={i} style={styleMarks}></span>)
    }

    return (
      <div className={className}>
        <div className="rangeScale-content">
          <div className="info-label value">
            <span className="val-value">{this.props.value}</span>
            <span className="val-label">{this.props.label}</span>
          </div>
          <div className="rangeScale-track monitor">
            <div className="rangeScale-mask monitor">
              <div className={classes} style={style}>
              </div>
            </div>
            <svg className="rangeScale-target" width="10" height="10" style={pointer}>
              <path d="M4.98289,0L-0.0171086,5L9.98289,5L4.98289,0Z"></path>
            </svg>
            <div className="rangeScale-scale">
              <div className="scale-marks">{marks}</div>
              <div className="label-begin">{min}</div>
              <div className="label-middle">{middle}</div>
              <div className="label-end">{max}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
