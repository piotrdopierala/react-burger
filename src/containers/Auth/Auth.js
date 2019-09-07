import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    contains: ['@', '.']
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        isSignIn: false
    }

    checkValidation(value, rules) {
        if (!rules) {
            return true;
        }
        if (rules.required) {
            if (value.trim() === '')
                return false;
        }
        if (rules.minLength) {
            if (value.trim().length < rules.minLength)
                return false;
        }
        if (rules.maxLength) {
            if (value.trim().length > rules.maxLength)
                return false;
        }
        if (rules.contains) {
            for (let searchedChars of rules.contains) {
                if (!value.includes(searchedChars)) {
                    return false;
                }
            }
        }
        return true;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState=>{
            return {
                isSignIn: !prevState.isSignIn
            };
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ));

        return (
            <div className={classes.Auth}>
                <div style={{'padding': '10px'}}>
                    {this.state.isSignIn? 'Sign in new user' : 'Log in'}
                </div>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    {this.state.isSignIn ? 'SWITCH TO LOG IN' : 'SWITCH TO SIGN IN'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

