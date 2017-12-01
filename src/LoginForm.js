import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {
  ACCOUNT_NAME,
  CREATE_ACCOUNT,
  LOGIN,
  NOT_HAVE_ACCOUNT,
  PASSWORD
} from './const/const-values';

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
  }

  disableLogin = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
    );
  }

  render = () => {
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
                <Button raised color="primary" disabled={this.disableLogin()}>
                   {LOGIN}
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={24} justify="center" alignItems="baseline">
              <Grid item xs={8} sm={4} md={4}>
                <Typography type="caption">{NOT_HAVE_ACCOUNT}</Typography>
              </Grid>
              <Grid item xs={8} sm={5} md={5}>
                <Button color="primary">
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
