import React, { Component } from 'react';
import axios from 'axios';
import EditableEventItemsList from './EditableEventItemsList.js';
import { BASE_URI, EVENTS_URI, EVENT_ITEMS_URI } from './const/urls';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid';
import ItemDialog from './ItemDialog';
import DeleteDialog from './DeleteDialog';
import { withNavigationBar } from './wrapper/withNavigationBar';
import { withAuthorization } from './wrapper/withAuthorization';
import { createXHRInstance } from './worker-service/axiosService';
import createBreakpoints from 'material-ui/styles/createBreakpoints';

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
      }
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
          // Server rejected or server error
        }})
      .catch(error => {
        // Not reach to Server
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
    const response = data.item_id ? await instance.patch(url, data) : await instance.post(url, data)
    if (response === undefined || response === null) return;
    this.setState({
      items: response.data.items
    });
  }

  execDelete = item => async () => {
    const instance = createXHRInstance();
    const deleteUrl = `${BASE_URI}${EVENT_ITEMS_URI}`;
    const deleteData = {
      event_id: this.props.event_id,
      item_id: item.item_id
    };
    const response = await instance.delete(deleteUrl, {data: deleteData}).catch(e => e);
    if (response === undefined || response === null) return;
    this.setState({
      items: response.data.items
    });
  }

  render() {
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
      </div>
    );
  }
}

export default  withAuthorization(withNavigationBar(ItemsDashboard));
