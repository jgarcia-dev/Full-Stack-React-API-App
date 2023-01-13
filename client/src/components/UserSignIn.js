import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UserSignIn = (props) => {
    const { signIn } = useContext(UserContext);
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ signInError, setSignInError ] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    /**
     * Handles sign in submission
     * If sign in credentials valid, resets error state and navigates user to last valid page visited.
     * If credentials not valid sets sign in error state.
     * If fetch error, navigates user to error page.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await signIn(emailAddress, password);

            if (user) {
                setSignInError("");

                // location state set in PrivateRoute component
                const validPrevLocation = location.state ? location.state.from.pathname : undefined;

                if (validPrevLocation) {
                    navigate(validPrevLocation, {replace:true});
                } else {
                    navigate("/");
                }
            } else {
                setSignInError("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
            navigate("/error");
        }
    }

    /**
     * @returns {JSX.Element|null} JSX for error display if error in state, else returns null.
     */
    const renderSignInError = () => {
        if (signInError) {
            return (
                <div className='validation--errors'>
                    <h3>Sign In Error</h3>
                    <ul>
                        <li>{signInError}</li>
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="form--centered">
            {renderSignInError()}
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="button" 
                    type="submit"
                >Sign In</button>
                <button 
                    className="button button-secondary"
                    onClick={handleCancel}
                >Cancel</button>
            </form>
            <p>Don't have a user account? Click here to  <Link to="/signup">sign up</Link>!</p>
        </div>
    )
}

export default UserSignIn;