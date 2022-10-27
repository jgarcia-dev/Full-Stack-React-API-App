import React from "react";

const Header = ()=> {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <a href="#">Courses</a>
                </h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, Joe Smith</li>
                        <li>
                            <a href="">Sign Out</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;