import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'

// Components
import Halftone from './Halftone';
import EmotionsPolarChart from './EmotionsPolarChart';
import EmotionsHBarChart from './EmotionsHBarChart';


export default (props) => {

  return (
    <div>
      <Row>
          <Col md={12} style={{marginBottom: "60px"}}>
            <Card style={{textAlign: "center"}}>
              <CardMedia>
                <Halftone key={props.selected_image} selected_image={props.selected_image} />
              </CardMedia>
            </Card>
          </Col>
      </Row>
      <Row>
          <Col md={12}>
            <Card style={{textAlign: "center"}}>
              <CardText>
                <Row>
                  <Col sm={12} md={6}>
                    <EmotionsHBarChart {...props} />
                  </Col>
                  <Col sm={12} md={6}>
                    <EmotionsPolarChart {...props} />
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Col>
      </Row>
    </div>
  )
}
