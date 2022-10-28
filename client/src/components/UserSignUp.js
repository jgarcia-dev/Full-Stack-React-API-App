import React from 'react';

const UserSignUp = () => {
    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <form action="">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" />
                <label htmlFor="lastName">Last Name</label>
                <input id="" name="" type="text" />
                <label htmlFor="Email Address">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary">Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="">sign in</a>!</p>
        </div>
    )
}

export default UserSignUp;