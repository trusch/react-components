import React, {Component} from 'react';
import Radiobutton        from './radiobutton.js';
import './radiobuttongroup.styl';

export default class Radiobuttongroup extends Component {
  static propTypes = {
    onChange : React.PropTypes.func,
    disabled : React.PropTypes.bool,
    buttons  : React.PropTypes.array,
    id       : React.PropTypes.string,
    name     : React.PropTypes.string,
    align    : React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    disabled  : false,
    id       : 'radiobuttongroup',
    name     : 'radiobutton',
    align    : 'vertical',
    className: 'radiobuttongroup',
    onChange : () => {},
  };

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  componentDidMount() {
    let i, button;
    let buttons = this.props.buttons;
    for (i = 0; i<buttons.length; i++) {
      button = buttons[i];
      if (button.checked) {
        this.setState({value: button.value});
      }
    }
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({value: value});
    this.props.onChange(value);
  }

  generateRadiobuttons() {
    let i, button, disabled;
    let buttons = this.props.buttons;
    let radiobuttons = [];
    for (i = 0; i<buttons.length; i++) {
      button = buttons[i];
      disabled = button.disabled || this.props.disabled;
      radiobuttons.push(
        <Radiobutton
          id={button.id}
          key={button.id}
          name={this.props.name}
          value={button.value}
          label={button.label}
          checked={button.value==this.state.value}
          disabled={disabled}
        />
      );
    }
    return radiobuttons;
  }

  render() {
    let className = this.props.className + " "+ this.props.align;

    return (
      <radiobuttongroup
        id={this.props.id}
        className={className}
        onChange={this.handleChange.bind(this)}>
        {this.generateRadiobuttons()}
      </radiobuttongroup>
    );
  }
}
