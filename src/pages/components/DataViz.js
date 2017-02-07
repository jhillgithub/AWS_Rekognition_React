import React from 'react';

// UI
import { Row, Col } from 'react-grid-system';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

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
                <Row style={{marginTop: "60px"}}>
                  <Col offset={{ sm: 4 }} sm={4}>
                    <Toggle
                      label="Counter Emotions"
                      defaultToggled={false}
                      onToggle={props.toggleHandler}
                      labelPosition="right"
                      // style={{margin: 20}}
                    />
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Col>
      </Row>
    </div>
  )
}
