import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import axios from 'axios';

import {
  ACCOUNT_NAME,
  ALREADY_HAVE_ACCOUNT,
  CONFIRM_PASSWORD,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FATAL_ERROR,
  LOGIN,
  NETWORK_REACH_ERROR,
  PASSWORD,
  SERVICE_NAME,
} from './const/const-values';
import {BASE_URI, SIGNUP_URI} from './const/urls';
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
  }
};

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      redirectToSignIn: false,
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
      case "confirm-password":
        newState.confirmPassword = newValue;
        break;
      default:
        return;
    }
    this.setState(newState);
  }

  handleClickSignup = () => {
    const postUrl = `${BASE_URI}${SIGNUP_URI}`;
    axios
      .post(postUrl, {
        name: this.state.name,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword
      })
      .then(response => {
        if (response !== undefined && response !== null && response.status === 201) {
          localStorage.setItem('authorizedToken', response.data.token);
          this.setState({ redirectToDashboard: true });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [CREATE_ACCOUNT_FATAL_ERROR]
          });
        }})
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 400) {
          // Bad request
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [CREATE_ACCOUNT_FATAL_ERROR]
          });
        }
        // Not reach to Server
        console.error(error);
      });
  };

  handleClickSignin = () => {
    this.setState({
      redirectToSignIn: true,
    });
  }

  disableCreateAccount = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
      || this.state.password !== this.state.confirmPassword
    );
  }

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false
    })
  }

  render = () => {
    return (
      <div>
        <RedirectOnce to={"/"} if={this.state.redirectToDashboard} />
        <RedirectOnce to={"/"} if={this.state.redirectToSignIn} />
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} md={12} style={styles.serviceName}>
            <Typography type="display1" gutterBottom align="center" color="secondary">
              {SERVICE_NAME}
            </Typography>
          </Grid>
          <Grid item xs={10} md={6} style={styles.gridPaper}>
            <Paper style={styles.paper}>
              <form>
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
                    <TextField
                      id="confirm-password"
                      name="confirm-password"
                      label={CONFIRM_PASSWORD}
                      className="TextField"
                      type="password"
                      margin="normal"
                      fullWidth
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} justify="center">
                  <Grid item xs={8} sm={4} md={4}>
                    <Button
                      id="signup"
                      raised
                      color="primary"
                      disabled={this.disableCreateAccount()}
                      onClick={this.handleClickSignup}>
                       {CREATE_ACCOUNT}
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={24} justify="center" alignItems="baseline">
                  <Grid item xs={8} sm={4} md={5}>
                    <Typography type="caption">{ALREADY_HAVE_ACCOUNT}</Typography>
                  </Grid>
                  <Grid item xs={8} sm={3} md={3}>
                    <Button id="signin" color="primary" onClick={this.handleClickSignin}>
                      {LOGIN}
                    </Button>
                  </Grid>
                </Grid>
              </form>
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

export default CreateAccountForm;
