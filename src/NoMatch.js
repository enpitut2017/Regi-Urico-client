import { Grid, Paper, Typography } from 'material-ui';
import React from 'react';
import {PAGE_NOT_FOUND} from './const/const-values';

const styles = {
  paper: {
    paddingTop: 16,
    paddingBottom: 16
  },
  title: {
    padding: 12,
  },
  body: {
    padding: 8
  }
}

const NoMatch = (props) => {
  return (
    <Grid container spacing={24} justify="center" style={styles.paper}>
      <Grid item>
        <Paper>
          <Typography type="title" style={styles.title}>
            Page Not Found
          </Typography>
          <Typography type="body1" style={styles.body}>
            {PAGE_NOT_FOUND}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default NoMatch;
