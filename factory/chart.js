module.exports = {
  lineAndBarChart: {
    chartOptions: {
      bezierCurve : true,
      datasetFill : false,
      pointDotStrokeWidth: 4,
      scaleShowVerticalLines: false,
      scaleShowHorizontalLines: true,
      responsive: true,
      scaleShowGridLines : true,
      scaleFontColor: "rgba(255,255,255,.3)",
      scaleLineColor: "rgba(255,255,255,.3)",
      scaleGridLineColor : "rgba(255,255,255,.3)",
      showTooltips: true,
      tooltipEvents: ["mousemove", "touchstart", "touchmove"]
    },
    defaultData: {
      labels: ["Jan 14", "Feb 14", "Mar 14", "Apr 14", "May 14", "Jun 14", "Jul 14", "Aug 14", "Sep 14", "Oct 14", "Nov 14", "Dec 14"],
      datasets: [{
        label: "pt10001",
        fillColor: "#25BDFF",
        strokeColor: "#25BDFF",
        pointColor: "#25BDFF",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#25BDFF",
        data: [28, 48, 40, 19, 86, 27, 100, 40, 19, 86, 27, 100]
      },
      {
        label: "pt10003",
        fillColor: "#FA4949",
        strokeColor: "#FA4949",
        pointColor: "#FA4949",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FA4949",
        data: [76, 33, 10, 25, 30, 88, 70, 10, 25, 30, 88, 70]
      },
      {
        label: "pt10006",
        fillColor: "#02B653",
        strokeColor: "#02B653",
        pointColor: "#02B653",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#02B653",
        data: [100, 89, 100, 55, 10, 25, 0, 100, 55, 10, 25, 0]
      }]
    }
  },

  doughnutPieChart: {
    chartOptions: {
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      percentageInnerCutout : 50,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false,
    },
    defaultData: [
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ]
  },

  radarChart: {
    chartOptions: {
      scaleShowLine : true,
      angleShowLineOut : true,
      scaleShowLabels : false,
      scaleBeginAtZero : true,
      angleLineColor : "rgba(0,0,0,.1)",
      angleLineWidth : 1,
      pointLabelFontFamily : "'Arial'",
      pointLabelFontStyle : "normal",
      pointLabelFontSize : 10,
      pointLabelFontColor : "#666",
      pointDot : true,
      pointDotRadius : 3,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true
    },
    defaultData: {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [{
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 96, 27, 100]
        }]
    }
  },

  polarChart: {
    chartOptions: {
      scaleShowLabelBackdrop : true,
      scaleBackdropColor : "rgba(255,255,255,0.75)",
      scaleBeginAtZero : true,
      scaleBackdropPaddingY : 2,
      scaleBackdropPaddingX : 2,
      scaleShowLine : true,
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false
    },
    defaultData: [
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      },
      {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
      },
      {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
      }
    ]
  }
}