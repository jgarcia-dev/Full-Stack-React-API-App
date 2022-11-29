import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Forbidden = () => {
    const { signOut } = useContext(UserContext);
    
    useEffect(() => {
        signOut();
    },);

    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
        </div>
    )
}

export default Forbidden