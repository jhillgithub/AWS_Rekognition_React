
import React from 'react';
var RadarChart = require("react-chartjs").Radar;

var chartData = {
    labels: ["No Emotions Detected Yet"],
    datasets: [
      {
        label: "Detected Emotions",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: [100]
      }
    ]
};

// var chartOptions = null;

// function getChartData(face) {
//   console.log("getChartData", face);
//   try {
//     console.log("label map:", face.Emotions.map(function(emotion) {return emotion.Type}));
//     console.log("data map: ", face.Emotions.map(function(emotion) {return emotion.Confidence}))
//     chartData.labels = face.Emotions.map(function(emotion) {return emotion.Type});
//     chartData.datasets[0].data = face.Emotions.map(function(emotion) {return emotion.Confidence});
//   } catch(err) {
//     // face doesn't exist
//   }
//   console.log("Chart data: ", chartData);
//   return chartData;
// }
export default (props) => {

  return (
    <RadarChart data={chartData} />
  )
}
