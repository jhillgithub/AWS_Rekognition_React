import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'

// Actions
import { change_theme, counter_emotions } from '../../actions/action_themes';

// Components
import DropzoneComponentWrapper from './components/DropzoneComponentWrapper';
import ProcessingDialog from '../components/ProcessingDialog';
import DataViz from '../components/DataViz';

import { connect } from "react-redux";

@connect((store) => {
  return {
    processing: store.rekog.processing,
    face: store.rekog.face,
    selected_image: store.selected_image,
    hue: store.hue,
    counterEmotions: store.themes.counterEmotions
  };
})
export default class UploadPage extends React.Component {
  constructor(props) {
      super(props);
      this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(event, value) {
    console.log("toggleHandler", event, value);
    this.props.dispatch(counter_emotions(value));
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <ProcessingDialog processing={this.props.processing} />
            <Card style={{textAlign: "center"}}>
              <CardTitle
                title="Welcome!"
                subtitle="Please upload an image to get started"
              />
              <CardText>
                <DropzoneComponentWrapper {...this.props}/>
              </CardText>
            </Card>
          </Col>
        </Row>
        <DataViz toggleHandler={this.toggleHandler} {...this.props} />
      </div>
    );
  }
}
