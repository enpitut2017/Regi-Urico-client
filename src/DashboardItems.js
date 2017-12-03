import React, { Component } from 'react';
import axios from 'axios';
import EditableEventItemsList from './EditableEventItemsList.js';
import { EVENTS_URI } from './const/const-values';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid';
import ItemDialog from './ItemDialog';
import DeleteDialog from './DeleteDialog';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class DashboardItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editItem: {
        id: '',
        name: '',
        price: '',
        count: ''
      },
      deleteItem: {
        id: '',
        name: '',
        price: '',
        count: ''
      }
    };
  }

  init = () => {
    const getUrl = `${EVENTS_URI}${this.state.eventId}`;

    axios
      .get(getUrl)
      .then(response => {
        if (response.status === 200) {
          const newItems = response.data.event_items;
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

  addButton = () => {
    return (
      <Button fab color="primary" aria-label="add" style={styles.marginTop15} onClick={this.createItem} >
        <AddIcon />
      </Button>
    );
  }

  editItem = itemId => () => {
    const item = this.state.items[itemId - 1];
    this.setState({
      editItem: item,
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
    const item = this.state.items[itemId - 1];
    this.setState({
      deleteItem: item,
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

  execDelete = item => async () => {
    const deleteData = {
      event_id: this.state.eventId,
      item_id: item.id
    };
    const response = await axios.delete(deleteData).catch(e => e);
    this.setState({
      items: response.data.event_items
    });
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <EditableEventItemsList items={this.state.items} handleDeleteClick={this.deleteItem} handleEditClick={this.editItem} ref="EventItemsList" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            {this.addButton()}
          </Grid>
        </Grid>
        <ItemDialog onRequestClose={this.onRequestItemDialogClose} open={this.state.itemDialog} item={this.state.editItem}/>
        <DeleteDialog onRequestClose={this.onRequestDeleteDialogClose} open={this.state.deleteDialog} item={this.state.deleteItem} handleDelete={this.execDelete}/>
      </div>
    );
  }
}

export default DashboardItems;