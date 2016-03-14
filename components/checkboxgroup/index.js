import React, {Component} from 'react';
import Checkbox           from './checkbox.js';

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
    diabled  : false,
    id       : 'radiobuttongroup',
    name     : 'radiobutton',
    align    : 'vertical',
    className: 'radiobuttongroup',
    onChange : () => {},
  };

  constructor(props) {
    super(props);
  }

  generateCheckboxes(){
    let i, button, disabled;
    let checkboxes = [];
    let buttons = this.props.buttons;
    for (i = 0; i<buttons.length; i++) {
      button = buttons[i];
      disabled = button.disabled || this.props.disabled;
      checkboxes.push(
        <Checkbox
          id={button.id}
          key={button.id}
          value={button.value}
          label={button.label}
          checked={button.checked}
          disabled={disabled}
          onChange={this.props.onChange}
        />
      );
    }
    return checkboxes;
  }

  render() {
    let className = this.props.className + " "+ this.props.align;

    return (
      <checkboxgroup id={this.props.id} className={className}>
        {this.generateCheckboxes()}
      </checkboxgroup>
    );
  }
}
