import React, { Component } from 'react';
import axios from 'axios';
import PaymentButton from './PaymentButton.js';
import EventItemsList from './EventItemsList.js';
import PaymentDialog from './PaymentDialog';
import { BASE_URI, EVENTS_URI } from './const/urls';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  init = () => {
    //TODO: 初期化処理
  }

  getInitialState = () => {
    return {
      event_id: 0,
      items: [],
      paymentButton: true,
      open: false,
      sumPrice: 0
    };
  }

  handleEventIdChange = event => {
    const newEventId = event.target.value;
    const getUrl = `${BASE_URI}${EVENTS_URI}${newEventId}`;

    if (Number.isNaN(parseInt(newEventId, 10))) return;

    axios
      .get(getUrl)
      .then(response => {
        if (response.status === 200) {
          const newItems = response.data.event_items;
          this.setState({
            event_id: newEventId,
            items: newItems,
            paymentButton: !(newItems.length > 0)
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

    const items = Object.keys(eventItems).map(value => {
      const eventItem = eventItems[value];
      const id        = eventItem.props.item_id;
      const name      = eventItem.props.name;
      const diffCount = eventItem.state.diffCount;
      return {
        id,
        name,
        diffCount
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

  onCheckoutButton = () => {
    //TODO: CheckoutButtonの処理
  }

  dialogOpen = () => {
    this.setState({ open: true });
  }

  render() {
    return (
      <div className="App">
        <div className="App-input">
          Event_id: <input type="number" value={this.state.value} onChange={this.handleEventIdChange} />
        </div>
        <EventItemsList items={this.state.items} ref="EventItemsList" />
        <PaymentButton onClick={this.onPaymentClick} disabled={this.state.paymentButton} />
        <PaymentDialog open={this.state.open} sumPrice={this.state.sumPrice} onRequestClose={this.onRequestClose} onCheckoutButton={this.onCheckoutButton}/>
      </div>
    );
  }
}

export default Register;
