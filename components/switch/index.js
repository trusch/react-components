import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './switch.styl';

export default class Switch extends Component {
  static propTypes = {
    id       : React.PropTypes.string,
    align    : React.PropTypes.string,
    className: React.PropTypes.string,
    labels   : React.PropTypes.array,
    equal    : React.PropTypes.bool,
    disabled : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    onChange : React.PropTypes.func,
  };

  static defaultProps = {
    id       : "",
    align    : "horizontal",
    className: "",
    labels   : [],
    equal    : false,
    disabled : 0,
    onChange : () => {},
  };

  constructor(props) {
    super(props);
  }

  generateId() {
    let rand = Math.floor((Math.random() * 1000000) + 1);;
    return "switch" + rand;
  }

  generateLabel(align) {
    let i, label, labels;
    labels = this.props.labels;
    for (i=0; i<labels.length; i++) {
      label = labels[i];
      if (!label.align) label.align = "left";
      if (label.align == align) {
        return (<p className={align}>{label.text}</p>);
      }
    }
    return null;
  }

  handleChange(e){
    let option = (e.target.checked) ? 1:0;
    this.props.onChange(option);
  }

  render() {
    let id = this.generateId();
    let labelLeft = this.generateLabel('left');
    let labelRight = this.generateLabel('right');
    let className = this.props.className;
    if (this.props.disabled) className += ' disabled';
    if (this.props.align) className += ' '+this.props.align;
    if (this.props.equal) className += ' equal';

    return (
      <switch id={this.props.id} className={className}>
        {labelLeft}
        <input
          id={id}
          type="checkbox"
          hidden
          onChange={this.handleChange.bind(this)}
          disabled={this.props.disabled}
        />
        <label className="switch-label" htmlFor={id}></label>
        {labelRight}
      </switch>
    );
  }
}
