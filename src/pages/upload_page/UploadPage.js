import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'

// Components
import DropzoneComponentWrapper from './components/DropzoneComponentWrapper';

import { connect } from "react-redux";

@connect((store) => {
  return {
    processing: store.rekog.processing,
    face: store.rekog.face,
    hue: store.hue
  };
})
export default class UploadPage extends React.Component {

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }}>
          <Card style={{textAlign: "center"}}>
            <CardTitle
              title="Welcome!"
              subtitle="Please upload an image to get started"
            />
            <CardText>
              <DropzoneComponentWrapper {...this.props}/>
            </CardText>
            <CardMedia>
              <div className="selected">
                {/* <img src={this.props.selected_image ? this.state.base_url + this.props.selected_image: ""} /> */}
                {/* <img src={this.props.selected_image ? '/uploads/nictest2.jpg': ""} /> */}
                {/* <div style={boundingBoxStyle}></div> */}
              </div>
            </CardMedia>
          </Card>
        </Col>
      </Row>
    );
  }
}
