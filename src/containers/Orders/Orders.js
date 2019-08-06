import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/getorders')
            .then(res => {
                this.setState({ orders: res.data, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    render() {
        let orderedBurgersJSX = [];        
        if (this.state.loading === false) {
            orderedBurgersJSX = this.state.orders.map(order => {
                return order.orderedBurgers.map(burger => {
                    return (
                        <Order
                            key={burger.id}
                            burger={burger}
                            price={order.price}
                        />
                    );
                });
            }
            );
        }else{
            orderedBurgersJSX = <Spinner/>            
        }
        
        return (
            <div>
                {orderedBurgersJSX}
            </div >
        );
    }
}

export default withErrorHandler(Orders, axios);