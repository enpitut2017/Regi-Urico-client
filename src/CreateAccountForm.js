import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {
  ACCOUNT_NAME,
  ALREADY_HAVE_ACCOUNT,
  CONFIRM_PASSWORD,
  CREATE_ACCOUNT,
  LOGIN,
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

class CreateAccountForm extends Component {
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
      case "confirm-password":
        newState.confirmPassword = newValue;
        break;
      default:
        return;
    }
    this.setState(newState);
  }

  disableCreateAccount = () => {
    return (
      this.state.name === ""
      || this.state.password === ""
      || this.state.password !== this.state.confirmPassword
    );
  }

  render = () => {
    return (
      <Grid container spacing={24} justify="center">
        <Grid item xs={10} md={6}>
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
                  <Button raised color="primary" disabled={this.disableCreateAccount()}>
                     {CREATE_ACCOUNT}
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={24} justify="center" alignItems="baseline">
                <Grid item xs={8} sm={4} md={5}>
                  <Typography type="caption">{ALREADY_HAVE_ACCOUNT}</Typography>
                </Grid>
                <Grid item xs={8} sm={3} md={3}>
                  <Button color="primary">
                    {LOGIN}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default CreateAccountForm;
