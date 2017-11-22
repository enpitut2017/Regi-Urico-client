import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { PAYMENT, YEN, YEN_MARK, CHECKOUT, DEPOSIT, THE_CHANGE } from './const/const-values';
import Grid from 'material-ui/Grid';

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
class PaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: '',
      theChange: 0,
      disabled: true
    };
  }

  handleChangeDeposit = event => {
    const newDeposit = event.target.value;
    const disabled = !(newDeposit >= this.props.sumPrice);
    const theChange = newDeposit - this.props.sumPrice;
    this.setState({
      deposit: newDeposit,
      theChange: (theChange < 0) ? 0 : theChange,
      disabled
    });
  }

  handleRequestClose = event => {
    this.props.onRequestClose();
  }

  handleCheckoutButton = event => {
    this.props.onCheckoutButton();
  }

  render() {
    return (
      <Dialog onRequestClose={this.handleRequestClose} open={this.props.open}>
        <DialogTitle style={styles.center}>{PAYMENT}</DialogTitle>
        <DialogContent>
          <Typography type="display3" style={styles.center}>{`${YEN_MARK}${this.props.sumPrice}`}</Typography>
          <Grid container>
            <Grid item xs={4}>{DEPOSIT}</Grid>
            <Grid item xs={6}><TextField type='number' value={this.state.deposit} onChange={this.handleChangeDeposit} /></Grid>
            <Grid item xs={2}>{YEN}</Grid>
          </Grid>
          <Grid container style={styles.marginTop30}>
            <Grid item xs={3}>{THE_CHANGE}</Grid>
            <Grid item xs={1}>{YEN_MARK}</Grid>
            <Grid item xs={3}>{this.state.theChange}</Grid>
            <Grid item xs={5}><Button raised disabled={this.state.disabled} color="primary" onClick={this.handleCheckoutButton}>{CHECKOUT}</Button></Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default PaymentDialog;