import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink exact="true" to="/" >Search</NavLink>
                </li>
                <li>
                    <NavLink to="/account">Account</NavLink>
                </li>
            </ul>
        </nav>
    );
}