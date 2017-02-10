import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-grid-system';

import { Card, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Webcam from 'react-webcam';
import axios from 'axios';

// Components
import ProcessingDialog from '../components/ProcessingDialog';
import DataViz from '../components/DataViz';

// Utils
import { detectFace, update_hue_color } from '../utils';

// Actions
import { change_theme, counter_emotions } from '../../actions/action_themes';
import { update_progress, save_face_data } from '../../actions/action_rekog';
import { select_image } from '../../actions/index';


import { connect } from "react-redux";

@connect((store) => {
  return {
    processing: store.rekog.processing,
    face: store.rekog.face,
    selected_image: store.selected_image,
    hue: store.hue,
    counterEmotions: store.themes.counterEmotions,
    current_emotion: store.themes.theme
  };
})
export default class WebcamPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    };
    this.toggleHandler = this.toggleHandler.bind(this);
    this.success = this.success.bind(this);
  }

  handleClick(event) {
    console.log(event.target);
  }

  toggleHandler(event, value) {
    console.log("toggleHandler", event, value);
    this.props.dispatch(counter_emotions(value));
    update_hue_color(this.props.hue, this.props.current_emotion, value);
  }

  success(filename) {
    var _this = this;
    this.props.dispatch(update_progress(true))
    this.props.dispatch(select_image(filename));
    detectFace(filename, this.props.hue, this.props.counterEmotions)
    .then(axios.spread(function(rekog_response, hue_response) {
      console.log("--------------------------------\n\n");
      console.log("face", rekog_response);
      console.log("--------------------------------\n\n");
      _this.props.dispatch(update_progress(false));
      _this.props.dispatch(change_theme(hue_response))
      _this.props.dispatch(save_face_data(rekog_response.data.FaceDetails[0]))
    }))
    .catch(function(error) {
      _this.props.dispatch(update_progress(false));
    });
  }

  screenshot() {
    var _this = this;
    var screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
    URL = '/upload/base64';
    console.log(screenshot);
    axios.post(URL, {imageBinary: screenshot}).then((response) => {
      console.log(response);
      _this.success(response.data.selected_file);
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <Card style={{textAlign: "center"}}>
              <CardTitle
                title="Welcome!"
                subtitle="Capture an Image to get started."
              />
              <CardActions>
                <RaisedButton
                  label="Capture Screenshot"
                  primary={true}
                  onClick={this.screenshot.bind(this)}
                />
              </CardActions>
              <CardText>
                <Webcam
                  ref='webcam'
                  audio={false}
                  screenshotFormat="image/jpeg"
                />;
              </CardText>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <Card style={{textAlign: "center"}}>
              <DataViz toggleHandler={this.toggleHandler} {...this.props} />
              <CardMedia>
                { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
              </CardMedia>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
