import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventItemsList from './EventItemsList.js';
import CheckoutButton from './CheckoutButton.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      //items: []
      items: [
        {"price":1400,"item_id":1,"name":"GENSOUM@STER","count":10},
        {"price":600,"item_id":2,"name":"東方魔烈槍","count":15}
      ]
    };
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
        <EventItemsList items={this.state.items} />
        <CheckoutButton />
      </div>
    );
  }
}

export default App;
