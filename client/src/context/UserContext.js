import React, { useState, createContext, useEffect } from 'react';
import apiRequest from '../utilities/apiRequest';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

    const [authenticatedUser, setAuthenticatedUser] = useState(() => getUserAuthCookie());
    
    /**
     * Returns authenticated user cookie from browser if one exists.
     * @return {object|null} Cookie object or null if none found.
     */
    function getUserAuthCookie() {
        const userCookie = Cookies.get('authenticatedUser');
        if (userCookie) {
            return JSON.parse(userCookie);
        } else {
            return null;
        }
    }

    /**
     * Checks if current authenticated user credentials match those stored in browser cookie.
     * @return {boolean} If authenticated user credentials match cookie, returns true, otherwise false.
     */
    const userMatchesCookie = () => {
        if (authenticatedUser) {
            const userAuthCookie = getUserAuthCookie();
            if (userAuthCookie) {
                if (userAuthCookie.id === authenticatedUser.id) {
                    return true
                }
            }
        }
        return false;
    }

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
        userMatchesCookie,
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