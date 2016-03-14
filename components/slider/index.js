import React from 'react';

import './slider.styl';

export default class Slider extends React.Component {
  static propTypes = {
    location: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    let max = 100;
    if(this.props.value > 100) max = 150;
    if(this.props.value > 150) max = 200;
    if(this.props.value > 200) max = 250;
    this.state = {
      value: (this.props.value/max)*100 || 0
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  changeHandler(event) {
    this.setState({value: event.value});
  }
  
  render() {
    let classes = "range";

    if(this.state.value <= 40) classes += " blue";
    if(this.state.value > 40 && this.state.value <= 70) classes += " purple";
    if(this.state.value > 70) classes += " pink";
    return (
      <div className="slider-container">
        <input type="range" min="0" max="100" value={this.state.value} className={classes} onChange={this.changeHandler.bind(this)}/>
      </div>
    );
  }
}
