import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';


const UserForm = (props) => (
    <Card>
        <Row>
            <Col md={8} offset={{ md: 4 }}>
                <CardTitle title="New User Form" subtitle="Create a new User" />
                <CardText>
                    <div>

                        <TextField
                          floatingLabelText="Username"
                          value={props.inputUsername}
                          onChange={props.handleUsernameTextFieldChange}
                        />
                        <br />
                        <TextField
                          floatingLabelText="Email"
                          value={props.inputEmail}
                          onChange={props.handleEmailTextFieldChange}
                        />
                        <br />
                        <RaisedButton
                          label="Submit"
                          primary={true}
                          onClick={props.onClick}
                        />
                    </div>
                </CardText>
            </Col>
        </Row>
    </Card>


);

export default UserForm;
