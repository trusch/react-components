import React, {Component} from 'react';

import './pager.styl';

export default class Pager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: this.props.cur,
      incEnabled: (this.props.cur && this.props.max && (this.props.cur < this.props.max)) ? true : false,
      decEnabled: (this.props.cur && this.props.min && (this.props.cur > this.props.min)) ? true : false
    };
  }

  increment() {
    if(this.state.count < this.props.max) {
      this.setState({
        count: this.state.count + 1
      });
      this.setState({decEnabled: true});
    } else if(this.state.count == this.props.max) {
      this.setState({incEnabled: false});
    }
    this.props.incCallback(this.state.count);
  }

  decrement() {
    if(this.state.count > this.props.min) {
      this.setState({
        count: this.state.count - 1
      });
      this.setState({incEnabled: true});
    } else if(this.state.count == this.props.min) {
      this.setState({decEnabled: false});
    }
    this.props.decCallback(this.state.count);
  }

  render() {
    let max           = this.props.max ? ' / '+this.props.max     : 9999,
        min           = this.props.min ? this.props.min+' / '     : 0,
        cur           = this.props.cur ? this.props.cur           : 0,
        btnleft       = this.props.btnleft ? this.props.btnleft   : 'inc',
        btnright      = this.props.btnright ? this.props.btnright : 'dec',
        centeredlabel = this.props.centeredlabel ?  this.props.centeredlabel : null,
        leftlabel     = this.props.leftlabel ? <div className="counter-left-label">{this.props.leftlabel}</div>  : null,
        rightlabel    = this.props.rightlabel ? <div className="counter-right-label">this.props.rightlabel</div> : null,
        decclasses    = 'decrement-button',
        incclasses    = 'increment-button';

    decclasses += !this.state.decEnabled ? ' disabled' :'';
    incclasses += !this.state.incEnabled ? ' disabled' :'';

    return (
      <span className="counter-container">
        {leftlabel}
        <button onClick={this.decrement.bind(this)} className={decclasses}>{btnleft}</button>
        <div className="counter"> {centeredlabel} {this.state.count} {max} </div>
        <button onClick={this.increment.bind(this)} className={incclasses}>{btnright}</button>
        {rightlabel}
      </span>
    );
  }
}

// max, min, cur, btnleft, btnright, centerlebel, leftlebale, rightlabel
