import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import './Card.styl';

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  openShell() {
    return true;
  }

  toggleVPN() {
    return true;
  }

  getMap() {
    return "map";
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
    //console.log('card detail', this.props);
    let map, location;
    if(this.props.card.longitude && this.props.card.latitude) {
      map = <map>{this.getMap()}</map>;
      location = <location>{this.props.card.location}</location>
    }
    return (
      <Col xs={12} sm={6} md={4} lg={4}>
        <card className="enermon-card">
          <span > {this.props.card.name+''+this.props.cardid} </span>
          {map}
          {location}
          <button onClick={this.openShell.bind(this)}>Shell</button>
          <button onClick={this.toggleVPN.bind(this)}>VPN</button>
        </card>
      </Col>
    );
  }
}
