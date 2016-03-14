import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './button.styl';

export default class Button extends Component {
  static propTypes = {
    id       : React.PropTypes.string,
    icons    : React.PropTypes.array,
    label    : React.PropTypes.string,
    className: React.PropTypes.string,
    disabled : React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
  };

  static defaultProps = {
    id       : null,
    icons    : [],
    label    : null,
    disabled : 0,
    className: '',
  };

  constructor(props) {
    super(props);
  }

  generateChildren() {
    let children = [];
    let icons = this.props.icons;
    children = this.placeIcons(children, icons, "left");
    if (this.props.label) children.push(<span key={-1} className="text">{this.props.label}</span>);
    children = this.placeIcons(children, icons, "right");
    return children;
  }

  placeIcons(children, icons, pos) {
    let i, icon, className, align;
    for (i=0; i<icons.length; i++) {
      icon = icons[i];
      align = (icon.align) ? icon.align : 'left';
      if (align!=pos) continue;
      if (icon.src){
        children.push(<span id={icon.id} key={i} className={align}><img src={icon.src}/></span>); 
      }
      if (icon.classes) {
        className = icon.classes + " glyphicon glyphicon-th-large";
        className += " "+ align;
        children.push(<span id={icon.id} key={i} className={className}></span>);
      }
    }
    return children;
  }

  render() {
    let className = this.props.ClassName;
    if (this.props.disabled) className += ' disabled';

    return (
      <button
        {...this.props}
        id={this.props.id}
        disabled={this.props.disabled}
        className={className}>
          {this.generateChildren()}
      </button>
    );
  }
}
