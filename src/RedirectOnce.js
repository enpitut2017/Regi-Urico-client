import { Redirect, withRouter } from 'react-router-dom';
import React from 'react';

/**
 * Redirect Loopを起こさないリダイレクト。
 * @param {object} props = {
 *   to: string,
 *   if: bool
 * }
 * @provide string props.to リダイレクト先のURI
 * @provide bool   props.if リダイレクトするならばtrue, しないならばfalse
 */
const RedirectOnce = props => {
  if (props.to === props.location || !props.if) {
    return <div />;
  } else {
    return <Redirect to={props.to} />;
  }
}

export default withRouter(RedirectOnce);
