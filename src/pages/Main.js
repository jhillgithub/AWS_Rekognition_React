import React from 'react';
import { connect } from "react-redux";

import { Container } from 'react-grid-system';

// --------------Setup for Material-Ui -----------------------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// -----------------------------------------------------------------

// Themes
import angryTheme from '../themes/angry';
import happyTheme from '../themes/happy';
import sadTheme from '../themes/sad';
import disgustedTheme from '../themes/disgusted';
import surprisedTheme from '../themes/surprised';
import calmTheme from '../themes/calm';
import unknownTheme from '../themes/unknown';

// Components
import NavBar from './components/Navbar';

// actions
import { change_theme } from '../actions/action_themes';


@connect((store) => {
  return {
    theme: store.themes.theme
  };
})
export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.changeTheme = this.changeTheme.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
  }

  changeTheme() {
    // var newTheme = this.props.theme === 'happy' ? 'angry' : 'happy';
    // this.props.dispatch(change_theme(newTheme));
  }

  componentDidMount() {
      var ival = setInterval(this.changeTheme, 5000);
      this.setState({ival: ival});
  }

  componentWillUnmount() {
    clearInterval(this.state.ival);
  }

  selectTheme(theme) {
    switch (theme) {
      case 'ANGRY':
        return angryTheme;
        break;
      case 'CALM':
        return calmTheme;
        break;
      case 'DISGUSTED':
        return disgustedTheme;
        break;
      case 'HAPPY':
        return happyTheme;
        break;
      case 'SAD':
        return sadTheme;
        break;
      case 'SURPRISED':
        return surprisedTheme;
        break;
      default:
        return unknownTheme;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.selectTheme(this.props.theme))}>
        <div>
            <NavBar title={this.props.theme} />
            <Container>
              {this.props.children}
            </Container>
        </div>
      </MuiThemeProvider>
    );
  }
}
