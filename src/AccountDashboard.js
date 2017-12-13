import {
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from 'material-ui';
import { Redirect } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import CloseIcon from 'material-ui-icons/Close';
import {
  ACCOUNT_NAME,
  CHANGE_ACCOUNT_INFO,
  CHANGE_ACCOUNT_SUCCESS,
  CHANGE_ACCOUNT_FATAL_ERROR,
  CONFIRM_PASSWORD,
  DELETE_ACCOUNT,
  NETWORK_REACH_ERROR,
  PASSWORD,
} from './const/const-values';
import { BASE_URI, CHANGE_ACCOUNT_URI, DELETE_ACCOUNT_URI } from './const/urls';
import { createXHRInstance } from './worker-service/axiosService';
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
      confirmDelete: '',
      redirectToRoot: false,
      openSnackbar: false,
      message: ''
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
    // return (
    //   this.state.name === ""
    //   && this.state.password === ""
    // );
    return false;
  }

  disableDeleteAccount = () => {
    return (
      this.state.confirmDelete === ""
    );
  }

  handleClickChange = () => {
    const postUrl = `${BASE_URI}${CHANGE_ACCOUNT_URI}`;
    createXHRInstance()
      .patch(postUrl, {
        name: this.state.name,
        password: this.state.password
      })
      .then(response => {
        if (response.status == 200) {
          // success to patch
          this.setState({
            name: response.data.name,
            openSnackbar: true,
            message: CHANGE_ACCOUNT_SUCCESS
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            message: CHANGE_ACCOUNT_FATAL_ERROR
          });
        }})
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            message: NETWORK_REACH_ERROR
          });
        } else if (error.response.status === 400) {
          //  bad request
          let message = Object.keys(error.response.data.errors).map(key => {
            return (key + ' ' + this[key]);
          }, error.response.data.errors).join(', ')
          this.setState({
            openSnackbar: true,
            message: message
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            message: CHANGE_ACCOUNT_FATAL_ERROR
          });
        }
        console.error(error);
      });
  }

  handleClickDelete = () => {
    const postUrl = `${BASE_URI}${DELETE_ACCOUNT_URI}`;
    createXHRInstance()
      .delete(postUrl, { params: {
        password: this.state.confirmDelete
      }})
      .then(response => {
        if (response.status == 204) {
          // success to delete
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            message: CHANGE_ACCOUNT_FATAL_ERROR
          });
        }})
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            message: NETWORK_REACH_ERROR
          });
        } else if (error.response.status === 400) {
          //  bad request
          console.dir(error);
          let message = Object.keys(error.response.data.errors).map(key => {
            let errorMessage = error.response.data.errors[key].map(msg => key + ' ' + msg);
            return errorMessage.join('\n');
          }, error.response.data.errors).join('\n')
          this.setState({
            openSnackbar: true,
            message: message
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            message: CHANGE_ACCOUNT_FATAL_ERROR
          });
        }
        console.error(error);
      });
  }

  handleRequestCloseSnackbar = () => {
    this.setState({openSnackbar: false});
  }

  render() {
    if (this.state.redirectToRoot) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
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
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.openSnackbar}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestCloseSnackbar}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleRequestCloseSnackbar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      );
    }
  }
}

export default withAuthorization(withNavigationBar(AccountDashboard));
