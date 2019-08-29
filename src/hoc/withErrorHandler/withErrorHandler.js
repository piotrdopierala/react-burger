import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => { //czyszczenie bledow na start kolejnego requestu
                this.setState({ error: null });
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            if (this.reqInterceptor && axios.interceptors.request) {
                axios.interceptors.request.eject(this.reqInterceptor);
            }
            if (this.respInterceptor && axios.interceptors.response) {
                axios.interceptors.response.eject(this.respInterceptor);
            }
        }

        errorWindowCloseHandler = () => {
            this.setState({ error: null });
        }

        render(props) {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorWindowCloseHandler}
                    >
                        Something went wrong.<br />
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;