import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'

class BurgerBuilder extends Component {
    state = {};
    
    render(){
        return (
            <Aux>
                <div>Burger graphics representation</div>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;