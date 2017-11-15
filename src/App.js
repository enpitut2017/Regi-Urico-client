import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventItemsList from './EventItemsList.js';
import axios from 'axios';

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
    function isNumber(x){
      if( typeof(x) !== 'number' && typeof(x) !== 'string' )
        return false;
      else
        return (x == parseFloat(x) && isFinite(x));
    }
    let app = this;
    let newEventId = event.target.value;
    if (!isNumber(newEventId)) {
      return;
    }
    var newItems = [];
    let getUrl = `http://localhost:3001/events/${newEventId}`;
    axios.get(getUrl)
         .then(function (response) {
           if (response.status === 200) {
             // Success
             try {
               // try parsing response JSON
               newItems = response.data.event_items;
               app.setState({
                 event_id: newEventId,
                 items: newItems,
               });
             } catch (e) {
               // parse error
             }
           } else {
             // Server rejected or server error
           }})
         .catch(function (error) {
           // Not reach to Server
           console.log(error);
         });
  }
  
  render() {
    return (
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
        {/* <CheckoutButton /> */}
      </div>
    );
  }
}

export default App;
