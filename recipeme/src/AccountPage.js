import { Link } from 'react-router-dom';

export default function AccountPage() {
    return (
        <div>
            <h2>Account Page</h2>
            <p>Welcome to your account page!</p>
            <div>
                <Link to="/create-account">Create Account</Link>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}