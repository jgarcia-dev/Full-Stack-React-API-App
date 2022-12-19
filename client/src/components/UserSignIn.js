import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UserSignIn = (props) => {
    const { signIn } = useContext(UserContext);
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signIn(emailAddress, password);

        // if location state set in PrivateRoute component
        const validPrevLocation = location.state ? location.state.from.pathname : undefined;

        if (validPrevLocation) {
            console.log(validPrevLocation);
            navigate(validPrevLocation, {replace:true});
        } else {
            navigate(-1, {replace:true});
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="form--centered">
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