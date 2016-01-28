import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './input.styl';

export default class Input extends Component {

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
      <input id="" name="" type="" placeholder="placeholder" className="disabled"></input>
    );
  }
}
