// Login.js
import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin, email, setEmail, password, setPassword, loggedIn }) {
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        handleLogin(e);
    };

    if (loggedIn) {
        return <p>You are already logged in.</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/create-account">Create one here</Link>.
            </p>
        </form>
    );
}

export default Login;