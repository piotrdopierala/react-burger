import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        puchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get("http://localhost:8080/burger/api/ingredient/getAll").then(
            (response) => {
                let ingredientList = {};                
                response.data.forEach(el=>{
                    ingredientList[el["name"]] = 0})                
                this.setState({ingredients:ingredientList})
            }
        ).catch((error)=>{
            this.setState({error:true});
        })
    }

    updatePurchaseState(ingerients) {
        const igCount = Object.keys(ingerients)
            .map(igkey => ingerients[igkey])
            .reduce((sum, elCount) => sum + elCount);
        this.setState({ puchasable: igCount > 0 })
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceSubstraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubstraction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Piotr Dopierala',
                address: {
                    street: 'Dworcowa 1',
                    zipCode: '61-000',
                    country: 'Poland'
                },
                email: 'piotr@polska.pl'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('saveorder',order)
            .then(response => {
                this.setState({loading:false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading:false, purchasing: false});
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0); //true jesli ilosc skladnika <= 0
        }
        let burger = this.state.error? <p>Ingredient's can't be loaded! Reload Page.</p> : <Spinner/>;
        let orderSummary = null;
        if (this.state.loading){
            orderSummary=<Spinner/>;
        }    
        if(this.state.ingredients){
            burger = (  
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        puchasable={this.state.puchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
            </Aux>
            );
            orderSummary = <OrderSummary
                             ingredients={this.state.ingredients}
                             purchaseCancelled={this.purchaseCancelHandler}
                             purchaseContinued={this.purchaseContinueHandler}
                             price={this.state.totalPrice}
                            />;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);