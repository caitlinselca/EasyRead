import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/login';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isMounted, setMounted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const getLogin = async () => {
            const response = await isLogin();
            setLoggedIn(response);
            setMounted(true);
        }
        getLogin();
    });

    return isMounted ? (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            loggedIn ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    )
    : (<div></div>);
};

export default PrivateRoute;