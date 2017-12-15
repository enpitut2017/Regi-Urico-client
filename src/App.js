import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Register from './Register';
import DashBoard from './Dashboard';
import ItemsDashboard from './ItemsDashboard';
import EventDashboard from './EventDashboard';
import CreateEventForm from './CreateEventForm';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import NoMatch from './NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/signup" component={CreateAccountForm} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/create_event" component={CreateEventForm} />
          <Route path="/register" component={Register} />
          <Route path="/items_dashboard" component={ItemsDashboard} />
          <Route path="/event_dashboard" component={EventDashboard} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
