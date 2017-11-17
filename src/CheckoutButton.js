import React , {Component} from 'react';

class CheckoutButton extends Component{
	render(){
		return(

			<div className="CheckoutButton">
				<button className="CheckoutButton-button" onClick={() => alert("Checkout!!!")} >
					会計
				</button>
			</div>


			);
	}
}

export default CheckoutButton;