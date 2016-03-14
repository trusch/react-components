import React, {Component} from 'react';
import './radiobutton.styl';

export default class Radiobutton extends Component {
  static propTypes = {
    disabled : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    checked  : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    value    : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    label    : React.PropTypes.string,
    name     : React.PropTypes.string,
    id       : React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    disabled : 0,
    value    : 0,
    name     : 'radio',
    id       : 'rb',
    label    : '',
    className: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    var className = 'radio-box';
    if (this.props.disabled) className += ' disabled';

    return (
      <div className={className}>
        <input
          id={this.props.id}
          ref={this.props.id}
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          disabled={this.props.disabled}
          className="radio-input" />
        <label
          htmlFor={this.props.id}
          className="radio-label">
          {this.props.label}
        </label>
      </div>
    );
  }
}
