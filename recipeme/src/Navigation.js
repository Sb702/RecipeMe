import { Link } from "react-router-dom";

function Navigation({ loggedIn, handleLogout }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Search</Link>
                </li>
                {!loggedIn && (
                    <>
                        <li>
                            <Link to="/create-account">Create Account</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {loggedIn && (
                    <>
                        <li>
                            <Link to="/account">My Account</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;