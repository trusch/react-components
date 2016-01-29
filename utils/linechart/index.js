import React from "react";
import { Line } from "react-chartjs";

import './linechart.styl';

export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chart-line">
        <div className="graph-container">
          <Line data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />
        </div>
      </div>
    );
  }
};
