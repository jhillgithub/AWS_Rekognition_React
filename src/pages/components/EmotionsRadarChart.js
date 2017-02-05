
import React from 'react';
import { Radar } from 'react-chartjs-2';

const DEFAULT_LABELS = [
    'ANGRY',
    'CALM',
    'CONFUSED',
    'DISGUSTED',
    'HAPPY',
    'SAD',
    'SURPRISED',
    'UNKNOWN'
];


var radarChartOptions = {
  maxValue: 0.5,
  levels: 5,
  roundStrokes: true,
};

function getData(face) {
  try {
    let retval = DEFAULT_LABELS.map(function(label) {
      let data = face.Emotions.find((emotion) => emotion.Type === label);

      if (data) return {Label: label, Confidence: data.Confidence};

      return {Label: label, Confidence: 0};
    });
    return retval;
  } catch(err) {
    return [0,0,0,0,0,0,0,0];
  }
}
export default (props) => {
  //http://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  var _data = getData(props.face);
  _data.sort(function(a, b) {
    return parseFloat(a.Confidence) - parseFloat(b.Confidence);
  });
  const chartData = {
  labels: _.map(_data, 'Label'),
  datasets: [
    {
      label: 'Detected Emotions',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: _.map(_data, 'Confidence')
    }
  ]
};

  return (
    <Radar data={chartData} options={radarChartOptions}/>
  )
}
