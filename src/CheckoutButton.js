import React , {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  marginTop15: {
    marginTop: 15,
  }
};

class CheckoutButton extends Component{
	render(){
		return(

			<div className="row" style={styles.marginTop15}>
				<div className="col-xs-4 col-xs-offset-4">
					<RaisedButton label="会計" onClick={(e) => this.props.onClick(e)} />
				</div>
			</div>


			);
	}
}

export default CheckoutButton;