import { IconButton, Snackbar } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';
import React from 'react';

const ErrorMessageSnackBar = props => {
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
      message={<span id="message-id">{props.message}</span>}
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

export default ErrorMessageSnackBar;
