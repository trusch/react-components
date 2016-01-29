import React from 'react';

export class Grid extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let classes = "container";

    if(this.props.hiddenLG) {
      classes += " hidden-lg";
    }
    if(this.props.hiddenMD) {
      classes += " hidden-md";
    }
    if(this.props.hiddenSM) {
      classes += " hidden-sm";
    }
    if(this.props.hiddenXS) {
      classes += " hidden-xs";
    }

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}

export class Row extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let classes = "row";

    if(this.props.hiddenLG) {
      classes += " hidden-lg";
    }
    if(this.props.hiddenMD) {
      classes += " hidden-md";
    }
    if(this.props.hiddenSM) {
      classes += " hidden-sm";
    }
    if(this.props.hiddenXS) {
      classes += " hidden-xs";
    }

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}

export class Col extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let classes = "";

    if(this.props.lg) {
      classes += " col-lg-"+(this.props.lg);
    }
    if(this.props.md) {
      classes += " col-md-"+(this.props.md);
    }
    if(this.props.sm) {
      classes += " col-sm-"+(this.props.sm);
    }
    if(this.props.xs) {
      classes += " col-xs-"+(this.props.xs);
    }
    if(this.props.hiddenLG) {
      classes += " hidden-lg";
    }
    if(this.props.hiddenMD) {
      classes += " hidden-md";
    }
    if(this.props.hiddenSM) {
      classes += " hidden-sm";
    }
    if(this.props.hiddenXS) {
      classes += " hidden-xs";
    }

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}