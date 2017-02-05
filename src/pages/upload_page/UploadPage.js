import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'

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
    hue: store.hue
  };
})
export default class UploadPage extends React.Component {

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
        <DataViz {...this.props} />
      </div>
    );
  }
}
