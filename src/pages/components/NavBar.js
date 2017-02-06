import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { white } from '../../../node_modules/material-ui/styles/colors';

function handleTouchTap() {
  browserHistory.push('/');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
  link: {
      textDecoration: 'none',
      paddingLeft: "5px",
      paddingRight: "5px",
      verticalAlign: "middle",
      letterSpacing: "0px",
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "14px",
      color: "white",
      marginBottom: '16px'

  }
};

const iconStyles = {
  color: 'white',
};

const NavBar = (props) => (
  <AppBar
    title={<span style={styles.title}>Detected Emotion: {props.title}</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementLeft={<Link to={'/'}><IconButton><ActionHome color={white} /></IconButton></Link>}
    iconElementRight={
        <div>
            <Link to={'/upload'} style={styles.link}>
                <FlatButton
                    label="Upload Image"
                    style={styles.link}
                 />
            </Link>
            <Link to={'/hue'} style={styles.link}>
                <FlatButton
                    label="Connect Hue"
                    style={styles.link}
                 />
            </Link>
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon color={white} /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to={'/'} style={{textDecoration: 'none'}}><MenuItem primaryText="About" /></Link>
              <MenuItem href="https://github.com/jhillgithub/AWS_Rekognition_React" primaryText="Github" />
              <MenuItem href="https://www.linkedin.com/in/jeremy-hill-943506107" primaryText="Contact Me" />
            </IconMenu>
            {/* <Link to={'/admin'} style={styles.link}>
                <FlatButton
                    label="Admin"
                    style={styles.link}
                 />
            </Link>
            <FlatButton
                label="Logout"
                style={styles.link}
             /> */}
        </div>
    }
  />
);

export default NavBar;
