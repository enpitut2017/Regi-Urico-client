import { Button, TextField, Typography } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';

import {
  ACCOUNT_NAME,
  CHANGE_ACCOUNT_INFO,
  CONFIRM_PASSWORD,
  DELETE_ACCOUNT,
  PASSWORD,
} from './const/const-values';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';

const styles = {
  gridStyle: {
    marginTop: 15
  },
  paperStyle: {
    margin: '0 50'
  },
  cardStyle: {
  },
  cardContentStyle: {
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: 16
  },
  iconColor: {
    color: '#3f51b5'
  },
  fontColor: {
    color: '#616161'
  }
};

class AccountDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmDelete: ''
    }
  }

  handleChange = event => {
    const newValue = event.target.value;
    const id = event.target.id;
    let newState = {};
    switch (id) {
      case "name":
        newState.name = newValue;
        break;
      case "password":
        newState.password = newValue;
        break;
      case "confirm-delete":
        newState.confirmDelete = newValue;
        break;
      default:
        return;
    }
    this.setState(newState);
  }

  disableChangeAccount = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
    );
  }

  disableDeleteAccount = () => {
    return (
      this.state.confirmDelete === ""
    );
  }

  handleClickChange = () => {
  }

  handleClickDelete = () => {
  }

  render() {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} md={4} style={styles.gridStyle}>
          <Paper>
            <Grid container justify='center'>
              <Grid item xs={10} style={styles.iconColor}>
                <Grid item xs={12} md={12} style={styles.serviceName}>
                  <Typography type="headline" gutterBottom align="center">
                    {CHANGE_ACCOUNT_INFO}
                  </Typography>
                </Grid>
                <Card>
                  <CardContent style={styles.cardContentStyle}>
                    <Grid container spacing={24} justify="center">
                      <Grid item xs={8} sm={4} md={4}>
                        <TextField
                          id="name"
                          name="name"
                          label={ACCOUNT_NAME}
                          className="TextField"
                          margin="normal"
                          fullWidth
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={24} justify="center">
                      <Grid item xs={8} sm={4} md={4}>
                        <TextField
                          id="password"
                          name="password"
                          label={PASSWORD}
                          className="TextField"
                          type="password"
                          margin="normal"
                          fullWidth
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={24} justify="center">
                      <Grid item xs={8} sm={4} md={4}>
                        <Button
                          id="change-account"
                          raised
                          color="primary"
                          disabled={this.disableChangeAccount()}
                          onClick={this.handleClickChange}>
                           {CHANGE_ACCOUNT_INFO}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item xs={10} style={styles.iconColor}>
                <Grid item xs={12} md={12} style={styles.serviceName}>
                  <Typography type="headline" gutterBottom align="center">
                    {DELETE_ACCOUNT}
                  </Typography>
                </Grid>
                <Card>
                  <CardContent style={styles.cardContentStyle}>
                    <Grid container spacing={24} justify="center">
                      <Grid item xs={8} sm={4} md={4}>
                        <TextField
                          id="confirm-delete"
                          name="confirm-delete"
                          label={CONFIRM_PASSWORD}
                          className="TextField"
                          type="password"
                          margin="normal"
                          fullWidth
                          value={this.state.confirmDelete}
                          onChange={this.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={24} justify="center">
                      <Grid item xs={8} sm={4} md={4}>
                        <Button
                          id="delete-account"
                          raised
                          color="primary"
                          disabled={this.disableDeleteAccount()}
                          onClick={this.handleClickDelete}>
                           {DELETE_ACCOUNT}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withAuthorization(withNavigationBar(AccountDashboard));
