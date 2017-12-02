import { AppBar, Button, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import React from 'react';

import { LOGOUT } from './const/const-values';

const styles = {
  title: {
    flex: 1,
  }
}

const NavigationBar = props => {
  if (props.authorized) {
    return (
      <header>
        <AppBar position="fixed">
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
      </header>
    );
  }
};

export default NavigationBar;
