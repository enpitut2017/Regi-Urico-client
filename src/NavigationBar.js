import { AppBar, Button, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import React from 'react';

import { LOGOUT } from './const/const-values';

const styles = {
  navBar: {
    height: 56,
  },
  title: {
    flex: 1,
  }
}

const NavigationBar = props => {
  return (
    <nav>
      <AppBar position="fixed" style={styles.navBar}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="Pick a Event"
            onClick={props.handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={styles.title}>
            {props.title}
          </Typography>
          <Button color="contrast" onClick={props.handleSignOut}>
            {LOGOUT}
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavigationBar;
