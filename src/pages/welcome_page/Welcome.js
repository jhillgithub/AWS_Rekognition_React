import React from 'react'
import { Link } from 'react-router'

import { Row, Col } from 'react-grid-system'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ProjectTable from './components/ProjectTable'


export default class Welcome extends React.Component {

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }}>
          <ProjectTable />
        </Col>
      </Row>
    );
  }
}
