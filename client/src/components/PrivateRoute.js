import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
    const { authenticatedUser, userMatchesCookie } = useContext(UserContext);
    const location = useLocation();

    return (
        authenticatedUser && userMatchesCookie() 
            ? <Outlet /> 
            : <Navigate 
                to="/signin" 
                replace="true" 
                state={{from: location}}
                />
    )
}

export default PrivateRoute;