import React, {Component} from 'react';

import Progress from 'react-progress';

export default class ProgressBar extends Component {

    constructor(props){
        super(props);
        this.minCount = this.props.min || 0;
        this.maxCount = this.props.max || 10;
        this.state = {
            count: this.minCount
        };
    }

    increment(){
        let nextCount = this.state.count + 1;
        if(nextCount > this.maxCount){
            nextCount = this.minCount;
        }
        this.setState({count: nextCount});
    }

    decrement(){
        let nextCount = this.state.count - 1;
        if(nextCount < this.minCount){
            nextCount = this.maxCount;
        }
        this.setState({count: nextCount});
    }

  render() {
      let percent = this.state.count * (this.maxCount-this.minCount);

      console.log(percent);
      return (
          <progressBar>
            <Progress percent={percent}/>
            <button onClick={this.increment.bind(this)}>inc</button>
            <button onClick={this.decrement.bind(this)}>dec</button>
          </progressBar>
      );
  }
}
