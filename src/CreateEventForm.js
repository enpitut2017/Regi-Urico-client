<<<<<<< HEAD
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
=======
import React from 'react';
>>>>>>> added: CreateEventForm
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { NullOrEmpty } from './worker-service/formService';
<<<<<<< HEAD
import { XHRInstance } from './worker-service/axiosService';
import { CREATE_EVENT, EVENT_NAME, BACK, EVENTS_URI } from './const/const-values';
import { BASE_URI } from './const/urls';

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
=======
import { CREATE_EVENT, EVENT_NAME } from './const/const-values';

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

const CreateEventForm = props => {
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
>>>>>>> added: CreateEventForm

export default class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      redirect: false,
      disable: true
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
    const response = await XHRInstance.post(url, {name: eventName});
    localStorage.event_id = response.data.id;
    this.setState({
      redirect: true
    });
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
    if (this.state.redirect) return <Redirect to='/'/>
    return this.renderCreateEventForm();
  }
}