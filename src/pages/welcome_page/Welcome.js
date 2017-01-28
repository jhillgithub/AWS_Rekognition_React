import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import { connect } from "react-redux";

import { change_theme } from '../../actions/action_themes';

import { Row, Col } from 'react-grid-system';

import ImgGallery from './components/ImgGallery';

@connect((store) => {
  return {
    theme: store.themes.theme
  };
})
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.chooseTheme = this.chooseTheme.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  chooseTheme(emotions) {
    console.log(emotions);
    var maxConf = _.maxBy(emotions, 'Confidence');
    var maxEmotion = maxConf.Type;
    console.log(maxEmotion);
    this.props.dispatch(change_theme(maxEmotion));
  }

  clickHandler(event) {
    var _this = this;
    console.log(event.target.src);

    var selected_img = event.target.src.split(/(\\|\/)/g).pop();
    axios.post('/rekog', {filename: selected_img})
      .then(function(response) {
        console.log("got face: ", response);
        _this.chooseTheme(response.data.FaceDetails[0].Emotions);
      })
      .catch(function(error) {
        console.log("error: ", error);
      });

  }

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }}>
          <ImgGallery clickHandler={this.clickHandler} />
        </Col>
      </Row>
    );
  }
}
