import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_TOKEN_SESSION_ATTRIBUTE_TOKEN
} from '../service/AuthenticationService';
import axios from "axios";

class AuthenticatedRoute extends Component {

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_TOKEN);
                }
                return config
            }
        )
    }

    componentWillMount() {
        this.setupAxiosInterceptors();
    }

    render() {
        if (this.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute
