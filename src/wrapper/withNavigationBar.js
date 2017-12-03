import { Redirect } from 'react-router-dom';
import React, {Component} from 'react';

import {
  CLOSE_EVENTS_LIST,
  CONFIRM_LOGOUT,
  CONFIRM_LOGOUT_TEXT,
  LOGOUT,
  OPEN_EVENTS_LIST,
} from '../const/const-values';
import NavigationBar from '../NavigationBar';
import EventsListDrawer from '../EventsListDrawer';
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
        events: [{id: 1, name: "すごい同人誌"}, {id: 2, name: "コミフェ 12夏"}],
        openDrawer: false,
        openDialog: false,
        redirectToSignin: false
      };
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
      this.setState({event_id: event_id});
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
