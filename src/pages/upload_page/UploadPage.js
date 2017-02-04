import React from 'react';

import { Row, Col } from 'react-grid-system';

import { Card, CardTitle, CardText } from 'material-ui/Card';
// import ImageUploader from '../../components/ImageUploader';
import DropzoneComponentWrapper from './containers/DropzoneComponentWrapper';
import DropUploader from './components/DropUploader';

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
              {/* <DropUploader /> */}
              <DropzoneComponentWrapper />
              {/* <ImageUploader /> */}
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}
