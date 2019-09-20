import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './SignIn.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import checkValidation from '../../../shared/validation';

class SignIn extends Component {

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
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    switchToLogInHandler = () => {
        this.props.history.push('/login');
    }

    submitHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let key in this.state.controls) {
            console.log(key);
            formData[key] = this.state.controls[key].value
        };
        console.log(formData);
        this.props.onSignIn(formData);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
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
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<div style={{ margin: '10px' }}><p className={classes.error}>{this.props.error}</p>Try again.</div>);
        }
        return (
            < div className={classes.Auth} >
                <div style={{ 'padding': '10px' }}>
                    Sign in new user
                </div>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchToLogInHandler}>
                    SWITCH TO LOG IN
                </Button>
            </div >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        error: state.signIn.error,
        loading: state.signIn.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (formData) => dispatch(actions.signIn(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);