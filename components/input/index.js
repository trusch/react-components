import React, {Component} from 'react';

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
        <counter>
            <span > Count: {this.state.count} </span>
            <button onClick={this.increment.bind(this)}>inc</button>
            <button onClick={this.decrement.bind(this)}>dec</button>
       </counter>
    );
  }
}
