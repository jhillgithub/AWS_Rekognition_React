import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';


export default (props) => {
    return (
      <Card style={{textAlign: "center"}}>
        <CardTitle title="Hue Connection Form" subtitle="Connect your Hue Light" />
        <CardText>
            <div>

                <TextField
                  floatingLabelText="Authorized User Id"
                  value={props.hue.hueUser}
                  onChange={props.handleHueUserTextFieldChange}
                  style={{width:"100%", marginTop:"10px"}}
                />
                <br />
                <TextField
                  floatingLabelText="IP Address"
                  value={props.hue.hueIP}
                  onChange={props.handleHueIPTextFieldChange}
                  style={{width:"100%", marginTop:"10px"}}
                />
                <br />
                <TextField
                  floatingLabelText="Light ID"
                  value={props.hue.hueLightID}
                  onChange={props.handleHueLightIDTextFieldChange}
                  style={{width:"100%", marginTop:"10px"}}
                />
                <br />
                <RaisedButton
                  label="Connect"
                  primary={true}
                  onClick={props.onClick}
                  style={{width:"100%", marginTop:"10px"}}
                />
            </div>
        </CardText>

      </Card>
    );
};
