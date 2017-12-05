import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { NullOrEmpty } from './worker-service/formService';
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

export default CreateEventForm;
