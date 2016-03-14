import React, {Component} from 'react';
import {Col, Row} from '../../components/grid';

import './pager.styl';

export default class Pager extends Component {

  constructor(props) {
    super(props);
  }

  increment() {
    if (this.props.cur < this.props.max) {
      let cur = this.props.cur+1;
      this.props.incCallback(cur);
    }
  }

  decrement() {
    if (this.props.cur > this.props.min) {
      let cur = this.props.cur-1;
      this.props.decCallback(cur);
    }
  }

  render() {
    let incEnabled = (this.props.cur < this.props.max) ? true : false,
        decEnabled = (this.props.cur > this.props.min) ? true : false,
        leftlabel  = this.props.leftlabel  ? <div className="label">{this.props.leftlabel}</div>  : null,
        rightlabel = this.props.rightlabel ? <div className="label">{this.props.rightlabel}</div> : null,
        btnleft    = this.props.btnleft    ? this.props.btnleft  : 'inc',
        btnright   = this.props.btnright   ? this.props.btnright : 'dec',
        decclasses = decEnabled            ? 'button left'  :'button left disabled',
        incclasses = incEnabled            ? 'button right' :'button right disabled';

    return (
      <div className="pager">
        <Row>
          <Col xs={2} sm={2} md={1} lg={1}>
            {leftlabel}
            <button disabled={!decEnabled} onClick={this.decrement.bind(this)} className={decclasses}>{btnleft}</button>
          </Col>
          <Col xs={8} sm={8} md={10} lg={10}>
            {this.props.content}
          </Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            {rightlabel}
            <button disabled={!incEnabled} onClick={this.increment.bind(this)} className={incclasses}>{btnright}</button>
          </Col>
        </Row>
      </div>
    );
  }
}

        /*
        max           = this.props.max ? ' / '+this.props.max     : 9999,
        min           = this.props.min ? this.props.min+' / '     : 0,
        cur           = this.props.cur ? this.props.cur           : 0,
        centeredlabel = this.props.centeredlabel ?  this.props.centeredlabel : null,
        */
// max, min, cur, btnleft, btnright, centerlebel, leftlebale, rightlabel
