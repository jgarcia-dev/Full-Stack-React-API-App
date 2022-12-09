import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Forbidden from './Forbidden';

const PrivateRoute = () => {
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);

    return (
        authenticatedUser && userMatchesCookie() 
            ? <Outlet /> 
            : <Forbidden />
    )
}

export default PrivateRoute;