import React, { useState, createContext, useEffect } from 'react';
import apiRequest from '../utilities/apiRequest';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState("");
   
    useEffect(() => {
        const userCookie = Cookies.get('authenticatedUser')
        if (userCookie) {
            setAuthenticatedUser(JSON.parse(userCookie));
        }
    }, []);

    const signIn = async (username, password) => {
        const res = await apiRequest("/users", "GET", null, true, { username, password });
        
        if (res.status === 200) {
            const user = await res.json();
            const userData = {
                ...user,
                password
            }
            setAuthenticatedUser(userData);
            Cookies.set('authenticatedUser', JSON.stringify(userData), { expires: 1 });
        } else if (res.status === 401) {
            setAuthenticatedUser(null);
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser');
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