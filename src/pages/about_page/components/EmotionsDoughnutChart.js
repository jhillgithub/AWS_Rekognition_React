
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
      'rgba(244, 67, 54, 0.8)',
      'rgba(96, 125, 139, 0.8)',
      'rgba(255, 152, 0, 0.8)',
      'rgba(103, 58, 184, 0.8)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(33, 150, 244, 0.8)',
      'rgba(255, 193, 6, 0.8)',
      'rgba(97, 97, 97, 0.8)',
  ],
  hoverBackgroundColor: [
      'rgba(244, 67, 54, 1)',
      'rgba(96, 125, 139,  1)',
      'rgba(255, 152, 0,  1)',
      'rgba(103, 58, 184,  1)',
      'rgba(76, 175, 80,  1)',
      'rgba(33, 150, 244,  1)',
      'rgba(255, 193, 6,  1)',
      'rgba(97, 97, 97,  1)',
  ]
};

const chartData = {
    labels: DEFAULT_LABELS,
    datasets: [
        {
            data: [100,100,100,100,100,100,100,100],
            backgroundColor: colors.backgroundColor,
            hoverBackgroundColor: colors.hoverBackgroundColor
        }]
};

export default (props) => {
  return (
    <Doughnut data={chartData} />
  )
}
