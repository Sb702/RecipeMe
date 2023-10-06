import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navigation.css";

function Navigation({ loggedIn, handleLogout }) {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
                    <span className="navbar-logo-text">RecipeMe</span>
                </Link>
                <div className="navbar-menu" onClick={handleMenuClick}>
                    {showMenu ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={`navbar-links ${showMenu ? "active" : ""}`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={handleLinkClick}>
                            Search
                        </Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li className="navbar-item">
                                <Link
                                    to="/create-account"
                                    className="navbar-link"
                                    onClick={handleLinkClick}
                                >
                                    Create Account
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link
                                    to="/login"
                                    className="navbar-link"
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li className="navbar-item">
                                <Link
                                    to="/account"
                                    className="navbar-link"
                                    onClick={handleLinkClick}
                                >
                                    My Account
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;