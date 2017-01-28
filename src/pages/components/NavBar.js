import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

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
      color: "white"

  }
};


const NavBar = () => (
  <AppBar
    title={<span style={styles.title}>Title</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementRight={
        <div>
            <Link to={'/settings'} style={styles.link}>
                <FlatButton
                    label="Settings"
                    style={styles.link}
                 />
            </Link>
            <Link to={'/admin'} style={styles.link}>
                <FlatButton
                    label="Admin"
                    style={styles.link}
                 />
            </Link>
            <FlatButton
                label="Logout"
                style={styles.link}
             />
        </div>
    }
  />
);

export default NavBar;
