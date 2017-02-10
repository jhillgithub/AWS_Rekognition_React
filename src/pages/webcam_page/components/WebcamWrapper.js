import React from 'react';
import Webcam from 'react-webcam';

export default class WebcamWrapper extends React.Component {
  render() {
    return <Webcam
              ref='webcam'
            />;
  }
}
