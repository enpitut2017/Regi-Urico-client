import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { BASE_URI } from './const/urls';
import { CREATE_EVENT, EVENT_NAME, EVENTS_URI } from './const/const-values';
import { createXHRInstance } from './worker-service/axiosService';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';
import RedirectOnce from './RedirectOnce';

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

class CreateEventForm extends Component {
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
    const instance = createXHRInstance();
    const response = await instance.post(url, {name: eventName});
    localStorage.event_id = response.data.id;
    await this.setState({
      redirect: true
    });
  }

  renderCreateEventForm = () => {
    return (
      <div>
        <RedirectOnce to='/' if={this.state.redirect} />
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
      </div>
    );
  }

  render() {
    return this.renderCreateEventForm();
  }
}

export default withAuthorization(withNavigationBar(CreateEventForm));
