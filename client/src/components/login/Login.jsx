import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { useLogin } from "../../api/authApi.js";

export default function Login() {
    const navigate = useNavigate();
    const { loginUser } = useLogin();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.id]: true });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = "Username is required";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isFormValid) return;
    
        setLoading(true);
    
        try {
            const response = await loginUser(formData.username, formData.password);
    
            if (response && response.token && response.user) {
                const { token, user } = response;
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login successful!");
                navigate("/posts");
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            console.log(error);
            alert("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.username}
                    required
                />
                {touched.username && formErrors.username && (
                    <span className="error-text">{formErrors.username}</span>
                )}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.password}
                    required
                />
                {touched.password && formErrors.password && (
                    <span className="error-text">{formErrors.password}</span>
                )}

                <button type="submit" disabled={loading || !isFormValid}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className="signup-text">
                Don't have an account yet? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
}
