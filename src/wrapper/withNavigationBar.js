import React, {Component} from 'react';
import axios from 'axios';

import { BASE_URI, EVENTS_URI } from '../const/urls';
import {
  CONFIRM_LOGOUT,
  CONFIRM_LOGOUT_TEXT,
  GET_EVENTS_FATAL_ERROR,
  LOGOUT,
  NETWORK_REACH_ERROR,
  PATCH_EVENT_FATAL_ERROR,
} from '../const/const-values';
import { buildErrorMessage } from '../worker-service/errorMessageService';
import {
  addReloadNotification,
} from '../worker-service/reloadNotificationService';
import { createXHRInstance } from '../worker-service/axiosService';
import EventsListDrawer from '../EventsListDrawer';
import FeedbackSnackbar from '../FeedbackSnackbar';
import NavigationBar from '../NavigationBar';
import RedirectOnce from '../RedirectOnce';
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
      addReloadNotification();
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
        redirectToAccountDashboard: false,
        accountMenuAnchorEl: null,
        openSnackbar: false,
        messages: [],
        redirectToDashboard: false,
      };
    }

    componentWillMount = () => {
      this.setState({
        redirectToSignin: false,
        redirectToCreateEvent: false,
        redirectToAccountDashboard: false,
        redirectToDashboard: false,
        accountMenuAnchorEl: null
      });
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
          if (response !== undefined && response !== null && response.status === 200) {
            const newEvents = response.data.events;
            if (newEvents === undefined || newEvents.length <= 0) {
              this.setState({redirectToCreateEvent: true});
            } else {
              const lastUpdateEventId = newEvents[0].id;
              let newEventId = parseInt(localStorage.event_id, 10);
              if (Number.isNaN(newEventId) || newEvents.every(event => event.id !== newEventId)) {
                newEventId = lastUpdateEventId;
              }
              const newEvent = newEvents.find(event =>
                event.id === newEventId
              );
              const newTitle = newEvent.name;
              this.setState({
                events: newEvents,
                event_id: newEventId,
                title: newTitle
              });
              localStorage.event_id = newEventId;
            }
          } else {
            // Undefined Fatal Error
            this.setState({
              openSnackbar: true,
              messages: [GET_EVENTS_FATAL_ERROR]
            });
          }
        })
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
            this.setState({redirectToSignin: true});
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

    handleSignOut = () => {
      this.setState({openDialog: true});
    }

    handleOpenDrawer = () => {
      // TODO: Drawer描画コンポーネントの作成
      this.setState({openDrawer: true});
    }

    handleGoBack = () => {
      this.setState({redirectToDashboard: true});
    }

    handleRequestCloseDrawer = () => {
      this.setState({openDrawer: false});
    }

    handleClickEventItem = event_id => {
      const newTitle = this.state.events.find(event =>
        event.id === event_id
      ).name;
      this.setState({event_id: event_id, title: newTitle, openDrawer: false});
      localStorage.event_id = event_id;
    }

    handleClickNewEvent = () => {
      this.setState({redirectToCreateEvent: true});
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

    renameEventNameForEventDashboard = async eventName => {
      const url = `${BASE_URI}${EVENTS_URI}`;
      const instance = createXHRInstance();
      const event = {
        id: this.state.event_id,
        name: eventName
      };
      const response = await instance.patch(url, event).catch(error => {
        if (error.response === undefined) {
          // Not reach to Server
          this.setState({
            openSnackbar: true,
            messages: [NETWORK_REACH_ERROR]
          });
        } else if (error.response.status === 400) {
          // Bad request
          this.setState({
            openSnackbar: true,
            messages: buildErrorMessage(error.response.data.errors)
          });
        } else if (error.response.status === 401) {
          // Unauthorized
          localStorage.removeItem('authorizedToken');
          this.setState({redirectToSignin: true});
        } else {
          // Undefined Fatal Error
          this.setState({
            openSnackbar: true,
            messages: [PATCH_EVENT_FATAL_ERROR]
          });
        }
        console.error(error);
      });
      if (response === undefined || response === null) return;
      // Success to rename
      this.setState({
        event_id: response.data.id,
        title: response.data.name
      });
    }

    handleOpenAccountMenu = event => {
      this.setState({accountMenuAnchorEl: event.currentTarget});
    }

    handleChangeAccountInfoClick = () => {
      this.setState({redirectToAccountDashboard: true});
    }

    handleRequestClose = () => {
      this.setState({accountMenuAnchorEl: null});
    }

    handleRequestCloseSnackbar = () => {
      this.setState({openSnackbar: false});
    }

    render() {
      const provideProps = {
        event_id: this.state.event_id,
        event_name: this.state.title,
        renameEventNameForEventDashboard: this.renameEventNameForEventDashboard,
        changeEventForEventDashboard: this.handleClickEventItem
      };
      return (
        <div>
          <RedirectOnce to="/signin" if={this.state.redirectToSignin} />
          <RedirectOnce to="/create_event" if={this.state.redirectToCreateEvent} />
          <RedirectOnce to="/account" if={this.state.redirectToAccountDashboard} />
          <RedirectOnce to="/" if={this.state.redirectToDashboard} />
          <header>
            <NavigationBar
              title={this.state.title}
              handleSignOut={this.handleSignOut}
              handleOpenDrawer={this.handleOpenDrawer}
              handleOpenAccountMenu={this.handleOpenAccountMenu}
              handleChangeAccountInfoClick={this.handleChangeAccountInfoClick}
              handleRequestClose={this.handleRequestClose}
              anchorEl={this.state.accountMenuAnchorEl}
              handleGoBack={this.handleGoBack}
              authorized={true}
              goBack={this.props.location.pathname!=="/"}
            />
          </header>
          <div style={styles.content}>
            <InnerComponent {...this.props} {...provideProps}/>
          </div>
          <EventsListDrawer
            events={this.state.events}
            open={this.state.openDrawer}
            onClick={this.handleClickEventItem}
            onClickNewEvent={this.handleClickNewEvent}
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
          <FeedbackSnackbar
            open={this.state.openSnackbar}
            onRequestClose={this.handleRequestCloseSnackbar}
            messages={this.state.messages}
          />
        </div>
      );
    }
  }
}
