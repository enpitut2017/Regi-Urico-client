import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Register from './Register';

import CreateEventForm from './CreateEventForm';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import NoMatch from './NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/create_event" component={CreateEventForm} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/signup" component={CreateAccountForm} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
