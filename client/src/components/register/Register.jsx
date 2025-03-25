import { Link } from "react-router-dom";
import './Register.css';

export default function Register() {
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <label htmlFor="rePassword">Confirm Password:</label>
                <input type="password" id="rePassword" placeholder="Confirm your password" />

                <button type="submit">Sign Up</button>
            </form>
            <p className="signup-text">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}