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
    var className = '';
    var typeName = '';
    if(this.props.error) {
      className += 'error ';
    }
    if(this.props.disabled) {
      className += 'disabled ';
    }

    if(this.props.type === 'text') {
      typeName += 'text';
    } else if(this.props.type === 'password') {
      typeName += 'password';
    }

    return (
      <input type={typeName} id="" name="" placeholder="placeholder" className={className}></input>
    );
  }
}
