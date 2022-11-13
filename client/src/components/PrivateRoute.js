import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
    const { authenticatedUser } = useContext(UserContext);

    const userAuth = authenticatedUser;
    return (
        userAuth ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoute;