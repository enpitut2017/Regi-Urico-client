import { Redirect } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import axios from 'axios';

import {
  ACCOUNT_NAME,
  CREATE_ACCOUNT,
  LOGIN,
  NOT_HAVE_ACCOUNT,
  PASSWORD
} from './const/const-values';
import { BASE_URI, SIGNIN_URI } from './const/urls';

const styles = {
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 16,
  },
  plainText: {
    fontSize: '0.6em',
  }
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      redirectToSignUp: false,
      redirectToDashboard: false,
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
      default:
        return;
    }
    this.setState(newState);
  };

  handleClickSignup = () => {
    this.setState({ redirectToSignUp: true });
  };

  handleClickSignin = () => {
    const postUrl = `${BASE_URI}${SIGNIN_URI}`;
    axios
      .post(postUrl, {
        name: this.state.name,
        password: this.state.password
      })
      .then(response => {
        if (response.errors == null) {
          localStorage.setItem('authorizedToken', response.data.token);
          this.setState({redirectToDashboard: true});
        } else {
          // Server rejected or server error
        }})
      .catch(error => {
        // Not reach to Server
        console.error(error);
      });
  };

  disableLogin = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
    );
  };

  render = () => {
    if (this.state.redirectToDashboard) {
      return (<Redirect to={"/"} />);
    } else if (this.state.redirectToSignUp) {
      return (<Redirect to={"/signup"} />);
    }
    return (
      <Grid container spacing={24} justify="center">
        <Grid item xs={10} md={6}>
          <Paper style={styles.paper}>
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
              <Grid item>
                <Button raised color="primary" disabled={this.disableLogin()} onClick={this.handleClickSignin}>
                   {LOGIN}
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={24} justify="center" alignItems="baseline">
              <Grid item xs={8} sm={4} md={4}>
                <Typography type="caption">{NOT_HAVE_ACCOUNT}</Typography>
              </Grid>
              <Grid item xs={8} sm={5} md={5}>
                <Button color="primary" onClick={this.handleClickSignup}>
                  {CREATE_ACCOUNT}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default LoginForm;
