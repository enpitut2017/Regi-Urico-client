import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import { BASE_URI, EVENTS_URI, REGISTER_URI } from './const/urls';
import {
  GET_EVENTS_FATAL_ERROR,
  NETWORK_REACH_ERROR,
  REGISTER_FATAL_ERROR,
} from './const/const-values';
import { buildErrorMessage } from './worker-service/errorMessageService';
import { createXHRInstance } from './worker-service/axiosService';
import {withAuthorization} from './wrapper/withAuthorization';
import {withNavigationBar} from './wrapper/withNavigationBar';
import EventItemsList from './EventItemsList.js';
import FeedbackSnackbar from './FeedbackSnackbar';
import PaymentButton from './PaymentButton.js';
import PaymentDialog from './PaymentDialog';

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
      sumPrice: 0,
      openSnackbar: false,
      messages: [],
      redirectToRoot: false
    };
    this.init(this.props.event_id);
  }

  componentWillReceiveProps = nextProps => {
    this.init(nextProps.event_id);
  }

  init = event_id => {
    if (event_id === 0) return;
    const getUrl = `${BASE_URI}${EVENTS_URI}${event_id}`;
    const instance = createXHRInstance();

    if (Number.isNaN(parseInt(event_id, 10))) return;

    instance
      .get(getUrl)
      .then(response => {
        if (response !== undefined && response !== null && response.status === 200) {
          const newItems = response.data.items;
          this.setState({
            event_id: event_id,
            items: newItems,
            disablePaymentButton: !(newItems.length > 0 && newItems.some(object => object.diff_count !== 0))
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
          });
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
    }).filter(item => item.count !== 0);

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
    const response = await instance.post(url, data).catch(error => {
      if (error.response === undefined) {
        // Not reach to Server
        this.setState({
          openSnackbar: true,
          messages: [NETWORK_REACH_ERROR]
        });
      } else if (error.response.status === 403) {
        // Forbidden to modify logs whose owner isn't current user
        this.setState({
          openSnackbar: true,
          messages: buildErrorMessage(error.response.data.errors)
        });
      } else if (error.response.status === 404) {
        // Event or one or more Items Not Found
        this.setState({
          openSnackbar: true,
          messages: buildErrorMessage(error.response.data.errors)
        });
      } else {
        // Undefined Fatal Error
        this.setState({
          openSnackbar: true,
          messages: [REGISTER_FATAL_ERROR]
        });
      }
      console.error(error);
    });
    if (response === undefined || response === null) return;
    this.setState({
      items: response.data.items,
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

  handleRequestClose = () => {
    this.setState({openSnackbar: false});
  }

  render() {
    if (this.state.redirectToRoot) return <Redirect to="/" />;
    return (
      <div>
        <EventItemsList
          items={this.state.items}
          onDiffCountChange={this.updateDisablePaymentButton}
          ref="EventItemsList"
        />
        <PaymentButton onClick={this.onPaymentClick} disabled={this.state.disablePaymentButton} />
        <PaymentDialog open={this.state.open} sumPrice={this.state.sumPrice} onRequestClose={this.onRequestClose} onCheckoutButton={this.onCheckoutButton}/>
        <FeedbackSnackbar
          open={this.state.openSnackbar}
          onRequestClose={this.handleRequestClose}
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default withAuthorization(withNavigationBar(Register));
