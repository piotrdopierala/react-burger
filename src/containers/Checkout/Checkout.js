import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    
    state={
        ingredients:{
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsObj = {};
        for (let param of query.entries()){
            ingredientsObj[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredientsObj});
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    continueClicked={this.continueHandler} 
                    cancelClicked = {this.cancelHandler}/>
            </div>
        )
    }
}

export default Checkout;