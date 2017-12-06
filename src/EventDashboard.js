import React, { Componet } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';
import TextFiled from 'material-ui/TextField';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';
import { TextField } from 'material-ui';
import { EVENT_NAME, EVENTS_LIST } from './const/const-values';
import EventDialog from './EventDialog';
import { BASE_URI, EVENTS_URI } from './const/urls';

class EventDashboard extends Componet {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.event_id,
      eventName: '',
      dialog: false
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      eventId: nextProps.event_id,
      eventName: nextProps.event_name
    });
  }

  onRequestClose = () => {
    this.setState({
      dialog: false
    });
  }

  handleChange = event => {
    const eventName = event.target.value;
    this.setState({
      eventName
    });
  }

  onClickSave = async () => {
    const url = `${BASE_URI}${EVENTS_URI}`;
    // const data = this.
  }

  render() {
    return(
      <div>
        <Grid container justify='center'>
          <Grid item xs={10}>
            <Paper>
              <Card>
                <CardContent>
                  <Typography>{this.state.eventName}</Typography>
                </CardContent>
                <CardActions>
                  <Button raised color='accent' onClick={this.handleDelete}><DeleteIcon/></Button>
                  <Button raised color='primary' onClick={this.handleEdit}><EditIcon/></Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <EventDialog
          open={this.state.dialog}
          onRequestClose={this.onRequestClose}
          event={this.state.event}
          handleChange={this.handleChange}
          onClickSave={this.onClickSave}
        />
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(EventDashboard));