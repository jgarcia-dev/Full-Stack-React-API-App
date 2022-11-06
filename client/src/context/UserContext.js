import React, { useState, createContext } from 'react';
import apiRequest from '../utilities/apiRequest';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
   
    const [ authenticatedUser, setAuthenticatedUser ] = useState(null);

    const signIn = async (username, password) => {
        const res = await apiRequest("/users", "GET", null, true, { username, password });
        
        if (res.status === 200) {
            const user = await res.json();
            setAuthenticatedUser(user);
        } else if (res.status === 401) {
            setAuthenticatedUser(null);
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthenticatedUser(null);
    }

    const value = {
        authenticatedUser,
        signIn,
        signOut
    }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;