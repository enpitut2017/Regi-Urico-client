import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import React from 'react';

import {
  CHANGE_ACCOUNT_INFO,
  DELETE_ACCOUNT,
  LOGOUT
} from './const/const-values';

const styles = {
  navBar: {
    height: 56,
  },
  title: {
    flex: 1,
  }
}

const NavigationBar = props => {
  const open = Boolean(props.anchorEl);
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
          {/* <Button color="contrast" onClick={props.handleSignOut}>
            {LOGOUT}
          </Button> */}
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={props.handleOpenAccountMenu}
            color="contrast"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={props.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onRequestClose={props.handleRequestClose}
          >
            <MenuItem onClick={props.handleChangeAccountInfoClick}>{CHANGE_ACCOUNT_INFO}</MenuItem>
            <MenuItem onClick={props.handleSignOut}>{LOGOUT}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavigationBar;
