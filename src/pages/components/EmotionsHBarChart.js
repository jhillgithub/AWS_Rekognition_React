
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import _ from 'lodash';

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

const colors = {
  backgroundColor: [
      'rgba(244, 67, 54, 0.2)',
      'rgba(96, 125, 139, 0.2)',
      'rgba(255, 152, 0, 0.2)',
      'rgba(103, 58, 184, 0.2)',
      'rgba(76, 175, 80, 0.2)',
      'rgba(33, 150, 244, 0.2)',
      'rgba(255, 193, 6, 0.2)',
      'rgba(97, 97, 97, 0.2)',
  ],
  borderColor: [
      'rgba(244, 67, 54,1)',
      'rgba(96, 125, 139, 1)',
      'rgba(255, 152, 0, 1)',
      'rgba(103, 58, 184, 1)',
      'rgba(76, 175, 80, 1)',
      'rgba(33, 150, 244, 1)',
      'rgba(255, 193, 6, 1)',
      'rgba(97, 97, 97, 1)',
  ],
  hoverBackgroundColor: [
      'rgba(244, 67, 54, 0.4)',
      'rgba(96, 125, 139,  0.4)',
      'rgba(255, 152, 0,  0.4)',
      'rgba(103, 58, 184,  0.4)',
      'rgba(76, 175, 80,  0.4)',
      'rgba(33, 150, 244,  0.4)',
      'rgba(255, 193, 6,  0.4)',
      'rgba(97, 97, 97,  0.4)',
  ],
  hoverBorderColor: [
      'rgba(244, 67, 54,1)',
      'rgba(96, 125, 139, 1)',
      'rgba(255, 152, 0, 1)',
      'rgba(103, 58, 184, 1)',
      'rgba(76, 175, 80, 1)',
      'rgba(33, 150, 244, 1)',
      'rgba(255, 193, 6, 1)',
      'rgba(97, 97, 97, 1)',
  ],
};

// var radarChartOptions = {
//   maxValue: 0.5,
//   levels: 5,
//   roundStrokes: true,
// };

function getData(face) {
  try {
    let retval = DEFAULT_LABELS.map(function(label) {
      let data = face.Emotions.find((emotion) => emotion.Type === label);

      if (data) return {Label: label, Confidence: data.Confidence};

      return {Label: label, Confidence: 0};
    });
    return retval;
  } catch(err) {
    return DEFAULT_LABELS.map(function(label) {
      return {Label: label, Confidence: 0};
    });
  }
}

/**
* This function zips the colors associated with an emotion to the
* data. This is done to sort the colors along with the data priot to plotting.
**/
function zipColorsWithData(data) {
  function zipValues(array, values, keyname) {
    return array.map(function(item, index) {
      item[keyname] = values[index];
      return item;
    })
  }
  var withBackgroundColor = zipValues(data, colors.backgroundColor, 'backgroundColor');
  var withBorderColor = zipValues(withBackgroundColor, colors.borderColor, 'borderColor');
  var withHoverBackgroundColor = zipValues(withBorderColor, colors.hoverBackgroundColor, 'hoverBackgroundColor');
  var withHoverBorderColor = zipValues(withHoverBackgroundColor, colors.hoverBorderColor, 'hoverBorderColor');
  return withHoverBorderColor;
}

// http://stackoverflow.com/a/979325
function sort_by (field, reverse, primer) {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse*((a > b) - (b > a));
  }
}

export default (props) => {
  //http://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  var data = getData(props.face);
  var _data = zipColorsWithData(data);
  _data.sort(sort_by('Confidence', true));
  console.log("sorted and zipped with colors: ", _data);
  const chartData = {
  labels: _.map(_data, 'Label') || DEFAULT_LABELS,
  datasets: [
    {
      label: 'Detected Emotions',

      backgroundColor: _.map(_data, 'backgroundColor'),
      borderColor: _.map(_data, 'borderColor'),
      borderWidth: 1,
      hoverBackgroundColor: _.map(_data, 'hoverBackgroundColor'),
      hoverBorderColor: _.map(_data, 'hoverBorderColor'),
      data: _.map(_data, 'Confidence')
    }
  ]
};

  return (
    <HorizontalBar data={chartData} />
  )
}
