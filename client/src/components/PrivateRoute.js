import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);

    return (
        authenticatedUser && userMatchesCookie() 
            ? <Outlet /> 
            : <Navigate to="/forbidden" />
    )
}

export default PrivateRoute;