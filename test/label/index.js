import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './label.styl';

export default class Label extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <label htmlFor="male" className="">Male</label>
    );
  }
}
