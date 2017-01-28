// React
import React from 'react';
import { connect } from "react-redux";

// Redux
import { create_user, input_username, input_email } from '../../actions/userActions';
import { update_table_config, toggle_table_config, close_table_config } from '../../actions/userTableActions';

// UI
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';

// Local
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

@connect((store) => {
  console.log("store", store)
  return {
    user: store.user.user,
    inputUsername: store.user.inputUsername,
    inputEmail: store.user.inputEmail,
    userTableConfig: store.userTableConfig,
    theme: store.themes.theme
  };
})
export default class Admin extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameTextFieldChange = this.handleUsernameTextFieldChange.bind(this)
    this.handleEmailTextFieldChange = this.handleEmailTextFieldChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.dispatch(create_user(this.props.inputUsername, this.props.inputEmail))
  }

  handleUsernameTextFieldChange(event) {
      console.log("event", event);
    this.props.dispatch(input_username(event.target.value));
  }

  handleEmailTextFieldChange(event) {
    this.props.dispatch(input_email(event.target.value));
  }

  handleToggle = (event, toggled) => {
      console.log(event.target.name);
      this.props.dispatch(update_table_config({
          [event.target.name]: toggled
      }));
  };

  handleChange = (event) => {
    this.props.dispatch(update_table_config({height: event.target.value}));
  };

  handleToggleConfig = () => {
    this.props.dispatch(toggle_table_config());
  };

  handleCloseConfig = () => {
    this.props.dispatch(close_table_config());
  };

  render() {
    return (
      <div>
        <Row style={{marginBottom: "60px"}}>
            <Col md={12}>
                <UserForm
                    inputUsername={this.props.inputUsername}
                    inputEmail={this.props.inputEmail}
                    handleUsernameTextFieldChange={this.handleUsernameTextFieldChange}
                    handleEmailTextFieldChange={this.handleEmailTextFieldChange}
                    onClick={this.handleSubmit}
                />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <UserTable
                    config={this.props.userTableConfig}
                    handleToggle={this.handleToggle}
                    handleChange={this.handleChange}
                    handleToggleConfig={this.handleToggleConfig}
                    handleCloseConfig={this.handleCloseConfig}
                    users={this.props.user}
                />
            </Col>
        </Row>

        <h1>{this.props.inputUsername}</h1>
      </div>
    );
  }
}
