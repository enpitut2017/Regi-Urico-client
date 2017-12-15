import { Redirect } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { BASE_URI } from './const/urls';
import {
  CREATE_EVENT,
  CREATE_EVENT_FATAL_ERROR,
  EVENTS_URI,
  EVENT_NAME,
  NETWORK_REACH_ERROR,
} from './const/const-values';
import { buildErrorMessage } from './worker-service/errorMessageService';
import { createXHRInstance } from './worker-service/axiosService';
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
  serviceName: {
    marginTop: 64,
    paddingBottom: 0,
  }
};

export default class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      redirect: false,
      disable: true,
      openSnackbar: false,
      messages: []
    };
  }

  handleChange = e => {
    const eventName = e.target.value;
    this.setState({
      eventName,
      disable: eventName.length <= 0
    });
  }

  handleClick = async () => {
    const url = `${BASE_URI}${EVENTS_URI}`;
    const eventName = this.state.eventName;
    const instance = createXHRInstance();
    const response = await instance.post(url, {name: eventName}).catch(error => {
      if (error.response === undefined) {
        // Not reach to Server
        this.setState({
          openSnackbar: true,
          messages: [NETWORK_REACH_ERROR]
        });
      } else if (error.response.status === 400) {
        //  bad request
        console.log(buildErrorMessage(error.response.data.errors));
        this.setState({
          openSnackbar: true,
          messages: buildErrorMessage(error.response.data.errors)
        });
      } else if (error.response.status === 401) {
        // Unauthorized
        localStorage.removeItem('authorizedToken');
        this.setState({redirect: true});
      } else {
        // Undefined Fatal Error
        this.setState({
          openSnackbar: true,
          messages: [CREATE_EVENT_FATAL_ERROR]
        });
      }
      console.error(error);
    });
    if (response === undefined || response === null) return;
    localStorage.event_id = response.data.id;
    await this.setState({
      redirect: true
    });
  }

  handleRequestClose = () => {
    this.setState({openSnackbar: false});
  }

  renderCreateEventForm = () => {
    return (
      <Grid container spacing={24} justify='center'>
        <Grid item xs={12} md={12} style={styles.serviceName}>
          <Typography type='display1' gutterBottom align='center' color='secondary'>
            {CREATE_EVENT}
          </Typography>
        </Grid>
        <Grid item xs={10} md={6} style={styles.gridPaper}>
          <Paper style={styles.paper}>
            <Grid container spacing={24} justify='center'>
              <Grid item xs={8} sm={4} md={4}>
                <TextField
                  id='eventName'
                  name='eventName'
                  label={EVENT_NAME}
                  value={this.state.eventName}
                  onChange={this.handleChange}
                  className='TextField'
                  margin='normal'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={24} justify='center'>
              <Grid item xs={8} sm={4} md={4}>
                <Button
                  id='createEvnet'
                  raised
                  color='primary'
                  onClick={this.handleClick}
                  disabled={this.state.disable}
                >
                  {CREATE_EVENT}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div>
        {this.renderCreateEventForm()}
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.handleRequestClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}
