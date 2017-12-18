import { IconButton, Snackbar } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';
import React from 'react';

import FeedbackSnackbarMessageItemsList from
  './FeedbackSnackbarMessageItemsList';

/**
 *エラーメッセージの出力先のSnackbar。
 * @param {object} props = {
 *   open: bool,
 *   onRequestClose: () => void
 *   messages: [string]
 * }
 */
const FeedbackSnackbar = props => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={3000}
      onRequestClose={props.onRequestClose}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<FeedbackSnackbarMessageItemsList items={props.messages} />}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.onRequestClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

export default FeedbackSnackbar;
