import React , {Component} from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { PAYMENT } from './const/const-values';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class PaymentButton extends Component{
	render(){
		return(
			<Grid container style={styles.marginTop15}>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<Button raised disabled={this.props.disabled}  onClick={(e) => this.props.onClick(e)} >{PAYMENT}</Button>
				</Grid>
			</Grid>
		);
	}
}

export default PaymentButton;