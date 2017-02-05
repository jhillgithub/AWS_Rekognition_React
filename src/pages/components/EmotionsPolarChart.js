
import React from 'react';
import { Polar } from 'react-chartjs-2';

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

function getData(face) {
  try {
    let retval = DEFAULT_LABELS.map(function(label) {
      let data = face.Emotions.find((emotion) => emotion.Type === label);

      if (data) return data.Confidence;

      return 0;
    });
    return retval;
  } catch(err) {
    return [0,0,0,0,0,0,0,0];
  }
}
export default (props) => {
  var _data = getData(props.face);
  var chartData = {
    datasets: [{
        data: _data,
        backgroundColor: [
            '#F44336',
            '#607D8B',
            '#FF9800',
            '#673AB7',
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#616161'
        ],
        label: 'Detected Emotions' // for legend
    }],
    labels: DEFAULT_LABELS
};

  return (
    <Polar data={chartData} />
  )
}
