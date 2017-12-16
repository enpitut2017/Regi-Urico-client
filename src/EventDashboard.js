import React, { Component } from 'react';
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
import EventDialog from './EventDialog';
import DeleteEventDialog from './DeleteEventDialog';
import { createXHRInstance } from './worker-service/axiosService';
import { EVENT_NAME, EVENTS_LIST } from './const/const-values';
import { BASE_URI, EVENTS_URI } from './const/urls';

class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        id: props.event_id,
        name: props.event_name
      },
      editDialog: false,
      deleteDialog: false
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      event: {
        id: nextProps.event_id,
        name: nextProps.event_name
      }
    });
  }

  openEditDialog = () => {
    this.setState({
      editDialog: true
    });
  }

  openDeleteDialog = () => {
    this.setState({
      deleteDialog: true
    });
  }

  onRequestEditClose = () => {
    this.setState({
      editDialog: false
    });
  }

  onRequestDeleteClose = () => {
    this.setState({
      deleteDialog: false
    });
  }

  handleChange = event => {
    const eventName = event.target.value;
    this.setState({
      event: Object.assign({}, this.state.event, {name: eventName})
    });
  }

  handleDelete = () => {
    const instance = createXHRInstance();
    const url = `${BASE_URI}${EVENTS_URI}`;
    const event = {
      id: this.state.event.id
    };

    instance
      .delete(url, {data: event})
      .then(response => {
        if (response.status === 204) return; // Eventsが空
        this.props.changeEventForEventDashboard(response.id);
        this.setState({
          deleteDialog: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onClickSave = () => {
    this.props.renameEventNameForEventDashboard(this.state.event.name);
    this.setState({
      editDialog: false
    });
  }

  render() {
    return(
      <div>
        <Grid container justify='center'>
          <Grid item xs={10}>
            <Paper>
              <Card>
                <CardContent>
                  <Typography>{this.state.event.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button raised color='accent' onClick={this.openDeleteDialog}><DeleteIcon/></Button>
                  <Button raised color='primary' onClick={this.openEditDialog}><EditIcon/></Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <EventDialog
          open={this.state.editDialog}
          onRequestClose={this.onRequestEditClose}
          event={this.state.event}
          handleChange={this.handleChange}
          onClickSave={this.onClickSave}
        />
        <DeleteEventDialog
          open={this.state.deleteDialog}
          onRequestClose={this.onRequestDeleteClose}
          event={this.state.event}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(EventDashboard));
