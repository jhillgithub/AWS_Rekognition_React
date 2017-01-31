import React from 'react';

import { Row, Col } from 'react-grid-system';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import ImageUploader from '../../components/ImageUploader';
import DropzoneComponentWrapper from '../../components/DropzoneComponentWrapper';
import DropUploader from '../../components/DropUploader';

export default class SecondPage extends React.Component {

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }}>
          <Card style={{textAlign: "center"}}>
            <CardTitle
              title="Welcome To Settings!"
              subtitle="WooHoo"
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