import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import GetUserByToken from '../utils/GetUserByToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = localStorage.getItem(process.env.REACT_APP_TOKEN + "_user")
    const { user_by_token } = GetUserByToken()

    return (
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to="/user/login" />
        )} />
    );
};

export default PrivateRoute;