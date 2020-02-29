import React,  {Component} from 'react';

import Model from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const WithErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }
        render() {
            return (
                <Auxillary>
                    <Model 
                        show={this.state.error}
                        ModelClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.propos} />
                </Auxillary>
            )
        }
    }
}

export default WithErrorHandler;