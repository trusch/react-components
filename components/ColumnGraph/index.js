import React, {Component} from 'react';

import {Bar} from 'react-chartjs';

export default class ColumnGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data: {
          labels: ["Red", "Green", "Yellow"],
          datasets: [{
              data: [200, 50, 100],
              fillColor: "#F7464A",
              highlightFill: "#FF5A5E",
            }
          ],
        },

        options: {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,
            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",
            //Number - The width of each segment stroke
            segmentStrokeWidth: 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 50, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps: 100,
            //String - Animation easing effect
            animationEasing: "easeOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }

    };
  }

  render() {
    return (
        <columnGraph>
            <Bar data={this.state.data} options={this.state.options}/>
        </columnGraph>
    );
  }
}
