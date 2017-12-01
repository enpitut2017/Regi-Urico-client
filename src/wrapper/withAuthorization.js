import {Redirect} from 'react-router-dom';
import React, {Component} from 'react';

/**
 * ログイン認証が必要なコンポーネントのラッパー。
 * トークンのVerificationはサーバ側で行う。
 * @param  {React.Component} InnerComponent ラップするログイン認証が必要なコンポーネント
 * @return {React.Component}                ラップされたコンポーネント
 */
export const withAuthorization = InnerComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authorized: (localStorage.authorizedToken != null)
      }
    }
    componentWillMount() {
      this.userWillTransfer(this.props);
    }

    componentWillUpdate(nextProps) {
      this.userWillTransfer(nextProps);
    }

    userWillTransfer(props) {
      this.setState({
        authorized: (localStorage.authorizedToken != null)
      });
    }

    render() {
      return (
        this.state.authorized ? (
          <InnerComponent {...this.props} {...this.state}/>
        ) : (
          <Redirect to={'/signin'}/>
        )
      );
    }
  }
}
