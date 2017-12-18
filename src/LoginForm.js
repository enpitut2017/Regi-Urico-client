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
  NETWORK_REACH_ERROR,
  NOT_HAVE_ACCOUNT,
  PASSWORD,
  SERVICE_NAME,
  SIGNIN_FATAL_ERROR,
} from './const/const-values';
import { BASE_URI, SIGNIN_URI } from './const/urls';
import RedirectOnce from './RedirectOnce';
import { buildErrorMessage } from './worker-service/errorMessageService';
import FeedbackSnackbar from './FeedbackSnackbar';

const styles = {
  gridPaper: {
    paddingTop: 0,
  },
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 8,
  },
  plainText: {
    fontSize: '0.6em',
  },
  serviceName: {
    marginTop: 64,
    paddingBottom: 0,
  },
  logo: {
    width: 100,
    height: 'auto',
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
      openSnackbar: false,
      messages: []
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
        if (response !== undefined && response !== null && response.status === 200) {
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('authorizedToken', response.data.token);
          this.setState({redirectToDashboard: true});
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [SIGNIN_FATAL_ERROR]
          });
        }})
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [SIGNIN_FATAL_ERROR]
          });
        }
        console.error(error);
      });
  };

  disableLogin = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
    );
  };

  handleRequestClose = () => {
    this.setState({openSnackbar: false});
  }

  render = () => {
    return (
      <div>
        <RedirectOnce to={"/"} if={this.state.redirectToDashboard} />
        <RedirectOnce to={"/signup"} if={this.state.redirectToSignUp} />
        <Grid container spacing={24} justify="center">
          <Grid item xs={8} style={styles.serviceName}>
            <Typography type="display1" gutterBottom align="center" color="secondary">
              {SERVICE_NAME}
            </Typography>
          </Grid>
          <Grid item xs={10} md={6} style={styles.gridPaper}>
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
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.handleRequestClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default LoginForm;
