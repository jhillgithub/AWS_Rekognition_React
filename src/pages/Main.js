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
import confusedTheme from '../themes/confused';
import unknownTheme from '../themes/unknown';

// Components
import NavBar from './components/Navbar';

// actions
import { change_theme } from '../actions/action_themes';


@connect((store) => {
  return {
    theme: store.themes.theme,
    counterEmotions: store.themes.counterEmotions
  };
})
export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.selectTheme = this.selectTheme.bind(this);
  }

  selectTheme(theme, counterEmotions) {
    switch (theme) {
      case 'ANGRY':
        return counterEmotions ? calmTheme : angryTheme;
        break;
      case 'CALM':
        return counterEmotions ? happyTheme : calmTheme;
        break;
      case 'DISGUSTED':
        return counterEmotions ? confusedTheme : disgustedTheme;
        break;
      case 'HAPPY':
        return counterEmotions ? sadTheme : happyTheme;
        break;
      case 'SAD':
        return counterEmotions ? happyTheme : sadTheme;
        break;
      case 'SURPRISED':
        return counterEmotions ? disgustedTheme : surprisedTheme;
        break;
      case 'CONFUSED':
        return counterEmotions ? angryTheme : confusedTheme;
        break;
      default:
        return counterEmotions ? surprisedTheme : unknownTheme;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.selectTheme(this.props.theme, this.props.counterEmotions))}>
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
