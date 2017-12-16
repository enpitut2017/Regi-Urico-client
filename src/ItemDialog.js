import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import { ITEM_NAME, ITEM_PRICE, ITEM_COUNT, CANCEL, SAVE } from './const/const-values';
import { NullOrEmpty } from './worker-service/formService';

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

class ItemDialog extends Component {
  render() {
    const hasError = NullOrEmpty(this.props.item.name) || NullOrEmpty(this.props.item.price) || NullOrEmpty(this.props.item.count);
    return (
      <Dialog onRequestClose={this.props.onRequestClose} open={this.props.open}>
        <DialogTitle style={styles.center}></DialogTitle>
        <DialogContent>
          <TextField
            name='name'
            label={ITEM_NAME}
            value={this.props.item.name}
            onChange={e => this.props.handleChange('name', e.target.value)}
            type="text"
            fullWidth
           />
          <TextField
            name='price'
            label={ITEM_PRICE}
            value={this.props.item.price}
            onChange={e => this.props.handleChange('price', parseInt(e.target.value))}
            type='number'
            style={styles.marginTop30}
            fullWidth
           />
           <TextField
            name='count'
            label={ITEM_COUNT}
            value={this.props.item.count}
            onChange={e => this.props.handleChange('count', parseInt(e.target.value))}
            type='number'
            style={styles.marginTop30}
            fullWidth
           />
        </DialogContent>
        <DialogActions>
          <Button color="accent" onClick={this.props.onRequestClose}>{CANCEL}</Button>
          <Button disabled={hasError} color="primary" onClick={this.props.onClickSave}>{SAVE}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ItemDialog;