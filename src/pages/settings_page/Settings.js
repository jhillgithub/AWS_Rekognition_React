import React from 'react'

import { Row, Col } from 'react-grid-system'

import { Card, CardTitle, CardText } from 'material-ui/Card'


export default class SecondPage extends React.Component {

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }}>
          <Card>
            <CardTitle
              title="Welcome To Settings!"
              subtitle="WooHoo"
            />
            <CardText>
              We need to add some settings here...
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}
