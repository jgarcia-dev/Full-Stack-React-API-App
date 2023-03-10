import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

/**
 * Component renders top menu bar.
 * Displays user name and sign out button if user is authenticated.
 * If non authenticated user, renders sign up and sign in buttons.
 */
const Header = ()=> {
    const { authenticatedUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to="/">Courses</Link>
                </h1>
                <nav>
                    { authenticatedUser
                        ?
                            <ul className="header--signedin">
                                <li>Welcome, {`${authenticatedUser.firstName}`}</li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
                        :
                            <ul  className="header--signedout">
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </ul>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;