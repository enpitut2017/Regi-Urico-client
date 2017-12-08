import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { ALERT_DELETE_EVENT, EVENT_NAME, CANCEL, DELETE } from './const/const-values';

const styles = {
  center: {
    textAlign: 'center'
  },
  centerBlock: {
    margin: '0 auto'
  },
  marginTop30: {
    marginTop: 30
  },
  marginBottom15: {
    marginBottom: 15
  },
  marginBottom30: {
    marginBottom: 30
  }
};

const DeleteEventDialog = (props) => {
  return (
    <Dialog onRequestClose={props.onRequestClose} open={props.open}>
      <DialogTitle style={styles.center}></DialogTitle>
      <DialogContent>
        <DialogContentText style={styles.marginBottom30}>
          {ALERT_DELETE_EVENT}
        </DialogContentText>
          <TextField label={EVENT_NAME} defaultValue={props.event.name} style={styles.marginBottom30} disabled/>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onRequestClose}>{CANCEL}</Button>
        <Button color='accent' onClick={props.handleDelete(props.event)}>{DELETE}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEventDialog;