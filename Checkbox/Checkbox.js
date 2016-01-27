import React, {Component} from 'react';
//import classnames from 'classnames';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    let checked = false;
    if ('checked' in props) {
      checked = props.checked;
    } else {
      checked = props.defaultChecked;
    }
    this.state = {checked};
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  handleChange(e) {
    const checked = e.target.checked;
    if (!('checked' in this.props)) {
      this.setState({
        checked: checked ? 1 : 0,
      });
    }
    this.props.onChange(e, this.state.checked);
  }

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    let checked = this.state.checked;
    if (typeof checked === 'boolean') {
      checked = checked ? 1 : 0;
    }
    const className = classnames({
      [props.className]: !!props.className,
      [prefixCls]: 1,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-checked-${checked}`]: !!checked,
      [`${prefixCls}-disabled`]: props.disabled,
    });
    return (
      <span className={className}
            style={props.style}>
          <span className={`${prefixCls}-inner`}></span>
          <input {...props}
            defaultChecked={!!props.defaultChecked}
            className={`${prefixCls}-input`}
            checked={!!checked}
            onChange={this.handleChange}/>
        </span>
    );
  }
}

Checkbox.propTypes = {
  prefixCls: React.PropTypes.string,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
  checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
  onChange: React.PropTypes.func,
};

Checkbox.defaultProps = {
  prefixCls: 'rc-checkbox',
  style: {},
  type: 'checkbox',
  className: '',
  defaultChecked: 0,
  onChange: () => {
  },
};
