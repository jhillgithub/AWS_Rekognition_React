import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'


// Components
import DoughnutChart from './components/EmotionsDoughnutChart';


export default class UploadPage extends React.Component {
  constructor(props) {
      super(props);
      this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(event, value) {
    console.log("toggleHandler", event, value);
    this.props.dispatch(counter_emotions(value));
    update_hue_color(this.props.hue, this.props.current_emotion, value);
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            {/* <Card style={{textAlign: "center"}}> */}
            <Card style={{textAlign: "left"}}>
              <CardTitle
                title="The Emotionally Intelligent Smart Home"
                subtitle="An experiment in mood aware IoT devices using Deep Learning Algorithms"
              />
              <CardText>
                Color is intrinsically linked to Mood and Emotion. Through the use of Deep Learning algorithms capable of predicting emotion,
                Next Generation Smart Homes are able to detect and affect mood through IoT devices. This experiment mirrors dominant
                emotions detected in images and offers a basic dampening capability to counter emotion through lighting and color.
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <Card style={{textAlign: "center"}}>
              <CardTitle
                title="Colors and Emotions"
                subtitle="The chart below represents the color mapping to the basic emotions detected in the Deep Learning Algorithm"
              />
              <CardText>
                <DoughnutChart />
              </CardText>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
