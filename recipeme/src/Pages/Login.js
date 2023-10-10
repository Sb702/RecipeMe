// Login.js
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ handleLogin, email, setEmail, password, setPassword, loggedIn }) {
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        handleLogin(e);
    };

    if (loggedIn) {
        return <p>You are already logged in.</p>;
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-form__title">Login</h2>
            {error && <p className="login-form__error">{error}</p>}
            <div className="login-form__input-group">
                <label className="login-form__label" htmlFor="email-input">
                    Email:
                </label>
                <input
                    className="login-form__input"
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="login-form__input-group">
                <label className="login-form__label" htmlFor="password-input">
                    Password:
                </label>
                <input
                    className="login-form__input"
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-form__submit-button" type="submit">
                Login
            </button>
            <p className="login-form__create-account">
                Don't have an account? <Link to="/create-account">Create one here</Link>.
            </p>
        </form>
    );
}

export default Login;