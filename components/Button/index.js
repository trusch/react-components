import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './button.styl';

export default class Button extends Component {

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
    var className = '';
    if(this.props.error) {
      className += 'error ';
    }
    if(this.props.disabled) {
      className += 'disabled ';
    }
    return (
      <button className={className}>Button</button>
    );
  }
}
