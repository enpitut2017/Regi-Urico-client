import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import AccountDashboard from './AccountDashboard';
import CreateAccountForm from './CreateAccountForm';
import CreateEventForm from './CreateEventForm';
import DashBoard from './Dashboard';
import EventDashboard from './EventDashboard';
import ItemsDashboard from './ItemsDashboard';
import LoginForm from './LoginForm';
import NoMatch from './NoMatch';
import Register from './Register';
import SalesLogsDashboard from './SalesLogsDashboard';

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
          <Route path="/sales_logs" component={SalesLogsDashboard} />
          <Route path="/account" component={AccountDashboard} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
