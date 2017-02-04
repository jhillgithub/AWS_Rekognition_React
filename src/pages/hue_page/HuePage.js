import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HueConnector from './components/HueConnector';
import HueStatus from './components/HueStatus';

// actions
import { connect_hue, input_hue_user, input_hue_ip, input_hue_light_id } from '../../actions/action_hue';
import { toggle_hue_light } from '../../actions/action_hue_toggle';


import { connect } from 'react-redux';

@connect((store) => {
  return {
    hue: store.hue
  };
})
export default class HuePage extends Component {
  constructor(props) {
    super(props);

    this.handleHueUserTextFieldChange = this.handleHueUserTextFieldChange.bind(this);
    this.handleHueIPTextFieldChange = this.handleHueIPTextFieldChange.bind(this);
    this.handleHueLightIDTextFieldChange = this.handleHueLightIDTextFieldChange.bind(this);
    this.handleFormConnect = this.handleFormConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleTestConnection = this.handleTestConnection.bind(this);
  }

  handleHueUserTextFieldChange(event) {
    this.props.dispatch(input_hue_user(event.target.value));
  }

  handleHueIPTextFieldChange(event) {
    this.props.dispatch(input_hue_ip(event.target.value));
  }

  handleHueLightIDTextFieldChange(event) {
    this.props.dispatch(input_hue_light_id(event.target.value));
  }

  handleFormConnect() {
    this.props.dispatch(connect_hue(true));
  }

  handleDisconnect() {
    this.props.dispatch(connect_hue(false));
  }

  handleTestConnection() {
    this.props.dispatch(toggle_hue_light(this.props.hue));
  }

  getHueConnector() {
    return (
      <HueConnector
        handleHueUserTextFieldChange={this.handleHueUserTextFieldChange}
        handleHueIPTextFieldChange={this.handleHueIPTextFieldChange}
        handleHueLightIDTextFieldChange={this.handleHueLightIDTextFieldChange}
        onClick={this.handleFormConnect}
        {...this.props}
      />
    );
  }

  getHueConnectionData() {
    return (
      <HueStatus
        handleTestConnection={this.handleTestConnection}
        handleDisconnect={this.handleDisconnect}
        {...this.props}
      />
    );
  }

  render() {
    const connected = this.props.hue.hueConnected;
    return (
      <div>
        { connected ? this.getHueConnectionData() : this.getHueConnector() }
      </div>
    );
  }
}
