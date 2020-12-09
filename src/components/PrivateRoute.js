import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/utils';

const PrivateRoute = ({component: Component, restricted, ...rest}) => {
    const [isMounted, setMounted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isNewUser, setNewUser] = useState(false);

    useEffect(() => {
        const getLogin = async () => {
            const response = await isLogin();
            if(response.status === 200){
                setLoggedIn(true);
                if(response.data === 'new') setNewUser(true);
            }
            setMounted(true);
        }
        getLogin();
    });

    return isMounted ? (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            loggedIn ? (
                !isNewUser && restricted ? 
                    <Redirect to="/" /> 
                    : <Component {...props} />
            )
            : <Redirect to="/login" />
        )} />
    )
    : (<div></div>);
};

export default PrivateRoute;