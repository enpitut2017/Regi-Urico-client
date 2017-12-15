import { Redirect } from 'react-router-dom';
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import React, { Component } from 'react';

import { BASE_URI, EVENTS_URI, EVENT_ITEMS_URI } from './const/urls';
import {
  DELETE_EVENTITEM_FATAL_ERROR,
  GET_EVENTS_FATAL_ERROR,
  NETWORK_REACH_ERROR,
  PATCH_EVENTITEM_FATAL_ERROR,
  POST_EVENTITEM_FATAL_ERROR,
} from './const/const-values';
import { buildErrorMessage } from './worker-service/errorMessageService';
import { createXHRInstance } from './worker-service/axiosService';
import { withAuthorization } from './wrapper/withAuthorization';
import { withNavigationBar } from './wrapper/withNavigationBar';
import DeleteDialog from './DeleteDialog';
import EditableEventItemsList from './EditableEventItemsList.js';
import FeedbackSnackbar from './FeedbackSnackbar';
import ItemDialog from './ItemDialog';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class ItemsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editItem: {
        name: '',
        price: '',
        count: ''
      },
      deleteItem: {
        name: '',
        price: '',
        count: ''
      },
      redirectToRoot: false,
      openSnackbar: false,
      messages: []
    };
    this.init(this.props.event_id);
  }

  componentWillReceiveProps = nextProps => {
    this.init(nextProps.event_id);
  }

  init = eventId => {
    if (eventId === 0) return;
    const instance = createXHRInstance();
    const getUrl = `${BASE_URI}${EVENTS_URI}${eventId}`;

    instance
      .get(getUrl)
      .then(response => {
        if (response.status === 200) {
          const newItems = response.data.items;
          this.setState({
            items: newItems,
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [GET_EVENTS_FATAL_ERROR]
          });
        }})
      .catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          })
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else if (error.response.status === 403) {
          // Forbidden to get events whose owner isn't current user
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else if (error.response.status === 404) {
          // Event Not Found
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [GET_EVENTS_FATAL_ERROR]
          });
        }
        console.error(error);
      });
  }

  renderAddButton = () => {
    return (
      <Button fab color="primary" aria-label="add" style={styles.marginTop15} onClick={this.createItem} >
        <AddIcon />
      </Button>
    );
  }

  editItem = itemId => () => {
    const item = this.state.items.find(item => {
      return item.item_id === itemId;
    })
    this.setState({
      editItem: Object.assign({}, this.state.editItem, item),
      itemDialog: true
    });
  }

  createItem = () => {
    const newItem = {
      name: '',
      price: '',
      count: ''
    };
    this.setState({
      editItem: newItem,
      itemDialog: true
    });
  }

  deleteItem = itemId => () => {
    const item = this.state.items.find(item => {
      return item.item_id === itemId;
    });
    this.setState({
      deleteItem: Object.assign({}, this.state.deleteItem, item),
      deleteDialog: true
    });
  }

  onRequestItemDialogClose = () => {
    this.setState({
      itemDialog: false
    });
  }

  onRequestDeleteDialogClose = () => {
    this.setState({
      deleteDialog: false
    });
  }

  handleChange = (target, value) => {
    const newState = {};
    newState[target] = value;
    this.setState({
      editItem: Object.assign({}, this.state.editItem, newState)
    });
  }

  onClickSave = async () => {
    const instance = createXHRInstance();
    const url = `${BASE_URI}${EVENT_ITEMS_URI}`;
    const data = this.state.editItem;
    data['event_id'] = this.props.event_id;
    if (data.item_id) {
      const response = await instance.patch(url, data).catch(error => {
        if (error.response === undefined) {
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else if (error.response.status === 404) {
          // EventItem Not Found
          this.setState({
            items: error.response.data.items
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [PATCH_EVENTITEM_FATAL_ERROR]
          });
        }
      });
      if (response === undefined || response === null) return;
      // Success to Patch
      this.setState({
        items: response.data.items
      });
    } else {
      const response = await instance.post(url, data).catch(error => {
        if (error.response === undefined) {
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 400) {
          // Bad request
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToRoot: true});
        } else if (error.response.status === 404) {
          // EventItem Not Found
          // client側のitemテーブルが間違っている可能性があるので
          // サーバ側がitemテーブルを送り直してくる。
          this.setState({
            items: error.response.data.items
          });
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [POST_EVENTITEM_FATAL_ERROR]
          });
        }
      });
      if (response === undefined || response === null) return;
      // Success to post
      this.setState({
        items: response.data.items
      });
    }
  }

  execDelete = item => async () => {
    const instance = createXHRInstance();
    const deleteUrl = `${BASE_URI}${EVENT_ITEMS_URI}`;
    const deleteData = {
      event_id: this.props.event_id,
      item_id: item.id
    };
    const response = await instance.delete(deleteUrl, {data: deleteData}).catch(error => {
      if (error.response === undefined) {
        this.setState({
          openSnackbar: true,
          messages: [NETWORK_REACH_ERROR]
        });
      } else if (error.response.status === 401) {
        // Unauthorized
        localStorage.removeItem('authorizedToken');
        this.setState({redirectToRoot: true});
      } else if (error.response.status === 404) {
        // EventItem Not Found
        // client側のitemテーブルが間違っている可能性があるので
        // サーバ側がitemテーブルを送り直してくる。
        this.setState({
          items: error.response.data.items
        });
      } else {
        // Undefined Fatal Error
        this.setState({
          openSnackbar: true,
          messages: [DELETE_EVENTITEM_FATAL_ERROR]
        });
      }
    });
    if (response === undefined || response === null) return;
    // Success to delete
    this.setState({
      items: response.data.items
    });
  }

  onRequestFeedbackSnackbarClose = () => {
    this.setState({openSnackbar: false});
  }

  render() {
    if (this.state.redirectToRoot) return <Redirect to="/" />
    return (
      <div>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <EditableEventItemsList
              items={this.state.items}
              handleDeleteClick={this.deleteItem}
              handleEditClick={this.editItem}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            {this.renderAddButton()}
          </Grid>
        </Grid>
        <ItemDialog
          onRequestClose={this.onRequestItemDialogClose}
          open={this.state.itemDialog} item={this.state.editItem}
          handleChange={this.handleChange}
          onClickSave={this.onClickSave}
        />
        <DeleteDialog
          onRequestClose={this.onRequestDeleteDialogClose}
          open={this.state.deleteDialog}
          item={this.state.deleteItem}
          handleDelete={this.execDelete}
        />
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.onRequestFeedbackSnackbarClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default  withAuthorization(withNavigationBar(ItemsDashboard));
