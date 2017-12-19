import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from 'material-ui';
import Icon from 'material-ui/Icon';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ExitToApp from 'material-ui-icons/ExitToApp';
import GoBackIcon from 'material-ui-icons/KeyboardBackspace';
import React from 'react';

import {
  CHANGE_ACCOUNT_INFO,
  DELETE_ACCOUNT,
  LOGOUT,
  CONNECT_TO_TWITTER,
} from './const/const-values';
import { BASE_URI, TWITTER_URI } from './const/urls';

const styles = {
  navBar: {
    height: 56,
  },
  title: {
    flex: 1,
  },
  a: {
    textDecoration: 'none',
    color: 'black',
  },
  icon: {
    width: 24,
    verticalAlign: 'text-bottom',
    marginRight: '0.5em',
  },
}

const NavigationBar = props => {
  const open = Boolean(props.anchorEl);
  const isTwitterLoggedIn = (props.seller !== null && props.seller.twitter_screen_name !== null);
  let twitterMenu = null;
  if (isTwitterLoggedIn) {
    twitterMenu = <MenuItem>
        <a href={`https://twitter.com/${props.seller.twitter_screen_name}`} style={styles.a}>
            <img src={props.seller.twitter_image_url} style={styles.icon}/>
            {`${props.seller.twitter_name} (@${props.seller.twitter_screen_name})`}
        </a>
    </MenuItem>
  } else {
    twitterMenu = <MenuItem>
        <a href={BASE_URI + TWITTER_URI} style={styles.a}>
          <img src="/twitter.svg" style={styles.icon}/> {CONNECT_TO_TWITTER}
        </a>
    </MenuItem>
  }
  return (
    <nav>
      <AppBar position="fixed" style={styles.navBar}>
        <Toolbar>
          {(props.goBack) ? (
            <IconButton
              color="contrast"
              aria-label="Back to Dashboard"
              onClick={props.handleGoBack}
            >
              <GoBackIcon />
            </IconButton>
          ) : (
            <IconButton
              color="contrast"
              aria-label="Pick a Event"
              onClick={props.handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
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
            {twitterMenu}
            <MenuItem onClick={props.handleChangeAccountInfoClick}>
              <AccountCircle style={styles.icon} /> {CHANGE_ACCOUNT_INFO}
            </MenuItem>
            <MenuItem onClick={props.handleSignOut}>
              <ExitToApp style={styles.icon} /> {LOGOUT}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavigationBar;
