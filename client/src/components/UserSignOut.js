import React, { useContext, useEffect }from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'

/**
 * Component renders signs out user.
 */
const UserSignOut = () => {
    const { signOut } = useContext(UserContext);

    useEffect(() => {
        signOut();
    });

    return (
        <Navigate replace to="/" />
    )
}

export default UserSignOut;