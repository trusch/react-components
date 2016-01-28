import React, { Component, PropTypes } from 'react';
import style from './index.styl';

export default class Headline extends Component {
  static get propTypes() {
    return {
      icon: PropTypes.string,
      content: PropTypes.string,
      className: PropTypes.string,
      componentClass: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ]),
    };
  }

  render() {
    const HeaderType = this.props.componentClass;
    const iconSrc = '/src/images/'+this.props.icon;
    const Icon = (this.props.icon) ? <img className={style.icon} src={iconSrc} /> : '';

    return (
        <headline className={style.headline}>
            {Icon}
            <HeaderType className={this.props.className}>{this.props.content}</HeaderType>
        </headline>
    );
  }
}
