import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import axios from 'axios';
import CheckoutButton from './CheckoutButton.js';
import EventItemsList from './EventItemsList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleEventIdChange = this.handleEventIdChange.bind(this);
  }

  getInitialState() {
    return {
      event_id: 0,
      items: [],
    };
  }
  
  handleEventIdChange(event) {
    // const self = this;
    let newEventId = event.target.value;
    if (Number.isNaN(parseInt(newEventId, 10))) {
      return;
    }
    let newItems = [];
    let getUrl = `http://localhost:3001/events/${newEventId}`;
    axios.get(getUrl)
         .then(response => {
           if (response.status === 200) {
             // Success
             try {
               // try parsing response JSON
               newItems = response.data.event_items;
               this.setState({
                 event_id: newEventId,
                 items: newItems,
               });
             } catch (e) {
               // parse error
             }
           } else {
             // Server rejected or server error
           }})
         .catch(error => {
           // Not reach to Server
           console.log(error);
         });
  }
  
  handleCheckoutClick(event) {
    const list = this.refs.EventItemsList;
    console.dir(list);
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="App-input">
            Event_id: <input type="number" value={this.state.value} onChange={this.handleEventIdChange} />
          </div>
          <EventItemsList items={this.state.items} />
          <CheckoutButton onClick={this.handleCheckoutClick} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
