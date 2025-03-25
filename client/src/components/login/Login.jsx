import { Link } from "react-router-dom";
import './Login.css';

export default function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <button type="submit">Login</button>
            </form>
            <p className="signup-text">
                Don't have an account yet? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
}