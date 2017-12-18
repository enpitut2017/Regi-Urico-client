import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import { BASE_URI, EVENTS_URI } from './const/urls';
import {
  DELETE_EVENT_FATAL_ERROR,
  NETWORK_REACH_ERROR,
} from './const/const-values';
import { buildErrorMessage } from './worker-service/errorMessageService';
import { createXHRInstance } from './worker-service/axiosService';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';
import DeleteEventDialog from './DeleteEventDialog';
import EventDialog from './EventDialog';
import FeedbackSnackbar from './FeedbackSnackbar';
import RedirectOnce from './RedirectOnce';

class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        id: props.event_id,
        name: props.event_name
      },
      editDialog: false,
      deleteDialog: false,
      openSnackbar: false,
      messages: [],
      redirectToRoot: false,
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
        if (response.status === 204) {
          this.setState({
            deleteDialog: false,
            redirectToRoot: true
          });
        } else if (response.status === 200) {
          this.props.changeEventForEventDashboard(response.data.id);
          this.setState({
            deleteDialog: false,
            redirectToRoot: true
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [DELETE_EVENT_FATAL_ERROR]
          });
        }
      })
      .catch(error => {
        if (error.response === undefined) {
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else if (error.response.status === 403) {
          // Forbidden to modify events whose owner isn't current user
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          })
        } else if (error.response.status === 404) {
          // Event Not Found
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          })
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [DELETE_EVENT_FATAL_ERROR]
          })
        }
        console.error(error);
      });
  }

  onClickSave = () => {
    this.props.renameEventNameForEventDashboard(this.state.event.name);
    this.setState({
      editDialog: false
    });
  }

  handleRequestClose = () => {
    this.setState({openSnackbar: false});
  }

  render() {
    return(
      <div>
        <RedirectOnce to="/" if={this.state.redirectToRoot} />
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
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.handleRequestClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(EventDashboard));
