import React, { Component } from 'react';
import axios from 'axios';
import PaymentButton from './PaymentButton.js';
import EventItemsList from './EventItemsList.js';
import PaymentDialog from './PaymentDialog';
import {withAuthorization} from './wrapper/withAuthorization';
import { BASE_URI, EVENTS_URI, REGISTER_URI } from './const/urls';
import {withNavigationBar} from './wrapper/withNavigationBar';
import { createXHRInstance } from './worker-service/createXHRInstance';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      event_id: this.props.event_id,
      items: [],
      disablePaymentButton: true,
      open: false,
      sumPrice: 0
    };
  }

  componentWillReceiveProps = nextProps => {
    this.handleEventIdChange(nextProps.event_id);
  }

  handleEventIdChange = event_id => {
    const getUrl = `${BASE_URI}${EVENTS_URI}${event_id}`;
    const instance = createXHRInstance();

    if (Number.isNaN(parseInt(event_id, 10))) return;

    instance
      .get(getUrl)
      .then(response => {
        if (response.status === 200) {
          const newItems = response.data.event_items;
          this.setState({
            event_id: event_id,
            items: newItems,
            disablePaymentButton: !(newItems.length > 0 && newItems.some(object => object.diff_count !== 0))
          });
        } else {
          // Server rejected or server error
        }})
      .catch(error => {
        // Not reach to Server
        console.error(error);
      });
  }

  onPaymentClick = () => {
    const list = this.refs.EventItemsList;
    const eventItems = list.refs;

    if (Object.keys(eventItems).length === 0) return;

    this.postItems = Object.keys(eventItems).map(value => {
      const eventItem = eventItems[value];
      const id        = eventItem.props.item_id;
      const diffCount = eventItem.state.diffCount;
      return {
        id,
        count: -diffCount
      };
    });

    const sumPrice = Object.keys(eventItems).map(value => {
      const price = Number(eventItems[value].props.price);
      const count = Number(eventItems[value].state.diffCount);

      return price * count;
    }).reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
    this.setState({
      open: true,
      sumPrice
    })
    this.dialogOpen();
  }

  onRequestClose = () => {
    this.setState({ open: false });
  }

  onCheckoutButton = async () => {
    const instance = createXHRInstance();
    const url = `${BASE_URI}${REGISTER_URI}`;
    const data = {
      event_id: this.state.event_id,
      items: this.postItems
    };
    const response = await instance.post(url, data).catch(error => console.error(error));
    this.setState({
      items: response.data.event_items,
      open: false,
      disablePaymentButton: true
    });
  }

  dialogOpen = () => {
    this.setState({ open: true });
  }

  updateDisablePaymentButton = (itemId, newDiffCount) => {
    const eventItems = this.state.items.map(item => {
      if (item.item_id === itemId) item.diff_count = newDiffCount
      return item;
    });
    if (eventItems.every(object => object.diff_count === 0)) {
      this.setState({
        items: eventItems,
        disablePaymentButton: true,
      });
    } else {
      this.setState({
        items: eventItems,
        disablePaymentButton: false,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <EventItemsList
          items={this.state.items}
          onDiffCountChange={this.updateDisablePaymentButton}
          ref="EventItemsList"
        />
        <PaymentButton onClick={this.onPaymentClick} disabled={this.state.disablePaymentButton} />
        <PaymentDialog open={this.state.open} sumPrice={this.state.sumPrice} onRequestClose={this.onRequestClose} onCheckoutButton={this.onCheckoutButton}/>
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(Register));
