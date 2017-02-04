import React, { Component } from 'react';

import { connect } from 'react-redux';

@connect((store) => {
  return {
    face: store.rekog.face,
  };
})
export default class HuePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{JSON.stringify(this.props.face)}</div>
    );
  }
}
