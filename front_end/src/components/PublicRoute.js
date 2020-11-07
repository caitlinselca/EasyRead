import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/login';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
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
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            loggedIn && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    )
    : (<div></div>);
};

export default PublicRoute;