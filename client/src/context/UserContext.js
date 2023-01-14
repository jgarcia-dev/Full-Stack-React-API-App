import React, { useState, createContext } from 'react';
import apiRequest from '../utilities/apiRequest';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

/**
 * User context that manages global user authentication state.
 * Contains methods for signing in and signing out.
 * Contains methods for managing user authentication cookie.
 */
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

    /**
     * Calls method to make API call to verify user entered correct credentials and sets user state and cookie.
     * @param {string} username For API user validation
     * @param {string} password For API user validation
     * @returns {object|null} If valid credentials provided will return user object, else null. Throws error if fetch fails.
     */
    const signIn = async (username, password) => {
        let user = null;
        try {
            const res = await apiRequest("/users", "GET", null, true, { username, password });
            
            if (res.status === 200) {
                user = await res.json();
                const userData = {
                    ...user,
                    password
                }
                setAuthenticatedUser(userData);
                Cookies.set('authenticatedUser', JSON.stringify(userData), { expires: 1 });
            }
        } catch (err) {
            throw err;
        }
        return user;
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