import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './radiobutton.styl';

export default class Radiobutton extends Component {

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
      <div className="radiobutton-box disabled">
        <input type="radio" id="" name="" className="checked"></input>
        <label htmlFor=""><span className="round"></span>Radio Button 2</label>
      </div>
    );
  }
}
