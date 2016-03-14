import React, {Component} from 'react';
import './checkbox.styl';

export default class Checkbox extends Component {
  static propTypes = {
    checked       : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    disabled      : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    value         : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    label         : React.PropTypes.string,
    className     : React.PropTypes.string,
    style         : React.PropTypes.object,
    onChange      : React.PropTypes.func,
  };

  static defaultProps = {
    disabled      : 0,
    defaultChecked: 0,
    value         : 0,
    label         : '',
    className     : '',
    style         : {},
    onChange      : () => {},
  };

  constructor(props) {
    super(props);
    let checked = ('checked' in props) ? props.checked : props.defaultChecked;
    this.state = {checked};
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: nextProps.checked});
    }
  }

  handleChange(e) {
    const checked = e.target.checked;
    this.setState({checked: checked});
    this.props.onChange(this.props.value, checked);
  }

  render() {
    const props    = this.props;
    let classInput = "cb-input " + props.className;
    let classLabel = "cb-label";
    if (props.disabled) classLabel += " disabled";

    return (
      <checkbox>
        <label className={classLabel}>
          <input {...props}
            type="checkbox"
            checked={!!this.state.checked}
            onChange={this.handleChange.bind(this)}
            className={classInput} />
          <span>{props.label}</span>
        </label>
      </checkbox>
    );
  }
}
