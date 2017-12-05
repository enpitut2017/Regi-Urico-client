import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { ITEM_NAME, ITEM_PRICE, ITEM_COUNT, CANCEL, DELETE, ALERT_DELETE_ITEM } from './const/const-values';

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

const DeleteDialog = (props) => {
  return (
    <Dialog onRequestClose={props.onRequestClose} open={props.open}>
      <DialogTitle style={styles.center}></DialogTitle>
      <DialogContent>
        <DialogContentText style={styles.marginBottom30}>
          {ALERT_DELETE_ITEM}
        </DialogContentText>
          <TextField label={ITEM_NAME} defaultValue={props.item.name} style={styles.marginBottom30} disabled/>
          <TextField label={ITEM_PRICE} defaultValue={String(props.item.price)} style={styles.marginBottom30} disabled/>
          <TextField label={ITEM_COUNT} defaultValue={String(props.item.count)} style={styles.marginBottom30} disabled/>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onRequestClose}>{CANCEL}</Button>
        <Button color='accent' onClick={props.handleDelete(props.item)}>{DELETE}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;