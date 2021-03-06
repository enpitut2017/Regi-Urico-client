import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import { EVENT_NAME, CANCEL, SAVE } from './const/const-values';

const styles = {
  center: {
    textAlign: 'center'
  },
  centerBlock: {
    margin: '0 auto'
  },
  marginTop30: {
    marginTop: 30
  }
};

class EventDialog extends Component {
  render() {
    return (
      <Dialog onRequestClose={this.props.onRequestClose} open={this.props.open}>
        <DialogTitle style={styles.center}></DialogTitle>
        <DialogContent>
          <TextField
            name='eventName'
            label={EVENT_NAME}
            value={this.props.event.name}
            onChange={this.props.handleChange}
            type="text"
            fullWidth
           />
        </DialogContent>
        <DialogActions>
          <Button color="accent" onClick={this.props.onRequestClose}>{CANCEL}</Button>
          <Button color="primary" onClick={this.props.onClickSave}>{SAVE}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EventDialog;