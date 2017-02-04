import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';


export default (props) => {
    return (
      <Card style={{textAlign: "center"}}>
        <CardTitle title="Hue Connection Status" />
        <CardText>
            <div>
                {JSON.stringify(props.hue, null, 2)}
                <RaisedButton
                  label="Test Connection"
                  primary={true}
                  onClick={props.handleTestConnection}
                  style={{width:"100%", marginTop:"10px"}}
                />
                <RaisedButton
                  label="Disconnect"
                  primary={true}
                  onClick={props.handleDisconnect}
                  style={{width:"100%", marginTop:"10px"}}
                />
            </div>
        </CardText>

      </Card>
    );
};
