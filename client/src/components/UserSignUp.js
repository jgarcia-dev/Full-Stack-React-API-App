import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../utilities/apiRequest';
import { UserContext } from '../context/UserContext';

const UserSignUp = () => {
    const [formData, setFormData] = useState({});
    const [submitErrors, setSubmitErrors] = useState([]);
    const { signIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            const res = await apiRequest("/users", "POST", formData);
            if (res.status === 201) {
                signIn(formData.emailAddress, formData.password);
                navigate("/");
            } else if (res.status === 400) {
                const failedResponse = await res.json();
                setSubmitErrors(failedResponse.errors);
            } else if (res.status === 404) {
                navigate("/notfound");
            }
            else {
              navigate("error");
            }
        } catch (err) {
            console.log(err);
            navigate("/error");
        }
    }

    const handleCancel = ()=> {
        navigate("/");
    }

    const renderErrors = () => {
        return (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                {submitErrors.map((error, index) => <li key={index}>{error}</li>)}
            </div>
        )
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            { submitErrors.length > 0
                ? renderErrors()
                : null
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={formData.firstName || ""}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                />
                <label htmlFor="Email Address">Email Address</label>
                <input 
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={formData.emailAddress || ""}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" type="button" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    )
}

export default UserSignUp;