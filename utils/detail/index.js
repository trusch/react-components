import React, {Component} from 'react';
import { Grid, Row, Col } from '../../components/grid';
import './detail.styl';

export default class Detail extends Component {

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
      <detail>
        {this.props.content}
      </detail>
    );
  }
}
