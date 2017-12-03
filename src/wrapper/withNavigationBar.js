import { Redirect } from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';

import { BASE_URI, EVENTS_URI } from '../const/urls';
import {
  CLOSE_EVENTS_LIST,
  CONFIRM_LOGOUT,
  CONFIRM_LOGOUT_TEXT,
  LOGOUT,
  OPEN_EVENTS_LIST,
} from '../const/const-values';
import EventsListDrawer from '../EventsListDrawer';
import NavigationBar from '../NavigationBar';
import SimpleDialog from '../SimpleDialog';

const styles = {
  content: {
    marginTop: 64,
  }
}

/**
 * ナビゲーションバーが必要なコンポーネントのラッパー。
 * @param  {React.Component} InnerComponent ラップするNavigationBarが必要なコンポーネント
 * @return {React.Component}                ラップされたコンポーネント
 * @provide props.event_id                  選択されたeventのid
 */
export const withNavigationBar = InnerComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = this.getInitialState();
    }

    init = () => {
      // TODO: APIサーバからのEvent一覧の取得
    }

    getInitialState = () => {
      return {
        event_id: 0,
        title: "",
        events: [],
        openDrawer: false,
        openDialog: false,
        redirectToSignin: false,
        redirectToCreateEvent: false,
      };
    }

    componentWillMount = () => {
      this.getEvents();
    }

    getEvents = () => {
      const token = localStorage.authorizedToken;
      if (token == null) {
        this.setState({redirectToSignin: true});
        return;
      }
      const getUrl = `${BASE_URI}${EVENTS_URI}`;
      axios
        .get(getUrl, {
          headers: {'X-Authorized-Token': token},
        })
        .then(response => {
          const newEvents = response.data.event;
          if (newEvents.length <= 0) {
            this.setState({redirectToCreateEvent: true});
          } else {
            const lastUpdateEventId = newEvents[0].id;
            let newEventId = parseInt(localStorage.event_id, 10);
            if (newEventId == null || newEvents.every(event => event.id !== newEventId)) {
              newEventId = lastUpdateEventId;
            }
            const newEvent = newEvents.filter(event =>
              event.id === newEventId
            )[0];
            const newTitle = (newEvent != null) ? newEvent.name : '';
            this.setState({
              events: newEvents,
              event_id: newEventId,
              title: newTitle
            });
            localStorage.event_id = newEventId;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    handleSignOut = () => {
      this.setState({openDialog: true});
    }

    handleOpenDrawer = () => {
      // TODO: Drawer描画コンポーネントの作成
      this.setState({openDrawer: true});
    }

    handleRequestCloseDrawer = () => {
      this.setState({openDrawer: false});
    }

    handleClickEventItem = event_id => {
      const newTitle = this.state.events.filter(event =>
        event.id === event_id
      )[0].name;
      this.setState({event_id: event_id, title: newTitle});
      localStorage.event_id = event_id;
    }

    handleRequestCloseDialog = () => {
      this.setState({openDialog: false});
    }

    handleOKDialog = () => {
      // サインアウト
      if (localStorage.authorizedToken) {
        localStorage.removeItem('authorizedToken');
      }
      this.setState({redirectToSignin: true});
    }

    render() {
      const provideProps = {
        event_id: this.state.event_id,
      };
      if (this.state.redirectToSignin) {
        return <Redirect to="/signin" />;
      } else if (this.state.redirectToCreateEvent) {
        return <Redirect to="/create_event" />;
      } else {
        return (
          <div>
            <header>
              <NavigationBar
                title={this.state.title}
                tooltipTitle={
                  this.state.openDrawer ? CLOSE_EVENTS_LIST : OPEN_EVENTS_LIST
                }
                handleSignOut={this.handleSignOut}
                handleOpenDrawer={this.handleOpenDrawer}
                authorized={true}
              />
            </header>
            <div style={styles.content}>
              <InnerComponent {...this.props} {...provideProps}/>
            </div>
            <EventsListDrawer
              events={this.state.events}
              open={this.state.openDrawer}
              onClick={this.handleClickEventItem}
              onRequestClose={this.handleRequestCloseDrawer}
            />
            <SimpleDialog
              ok={LOGOUT}
              title={CONFIRM_LOGOUT}
              text={CONFIRM_LOGOUT_TEXT}
              open={this.state.openDialog}
              onRequestClose={this.handleRequestCloseDialog}
              onOK={this.handleOKDialog}
              onCancel={this.handleRequestCloseDialog}
            />
          </div>
        );
      }
    }
  }
}
