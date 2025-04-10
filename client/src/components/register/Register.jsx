import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import { useRegister } from "../../api/authApi.js";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();

    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: "",
        favoriteTeam: ""
    });

    const [touched, setTouched] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/forum")
            .then((res) => res.json())
            .then((data) => {
                const teamsData = data.map(item => item.team);
                setTeams(teamsData);
            })
            .catch(() => alert("Failed to fetch teams"));
    }, []);

    useEffect(() => {
        validateForm();
    }, [formData, touched]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.id]: true });
    };

    const validateForm = () => {
        const errors = {};

        const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@[a-z]+\.[a-z]{2,3}$/;

        if (touched.email && !emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        if (touched.username && formData.username.length < 6) {
            errors.username = "Username must be at least 6 characters";
        }

        if (touched.password && formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (touched.rePassword && formData.password !== formData.rePassword) {
            errors.rePassword = "Passwords do not match";
        }

        if (touched.favoriteTeam && !formData.favoriteTeam) {
            errors.favoriteTeam = "Please select your favorite team";
        }

        setFormErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0 &&
            formData.email &&
            formData.username &&
            formData.password &&
            formData.rePassword &&
            formData.favoriteTeam
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(formData.email, formData.username, formData.password, formData.favoriteTeam);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            if (error.message === "Email already exists") {
                alert("This email is already in use!");
            } else if (error.message === "Username already exists") {
                alert("This username is already taken!");
            } else {
                alert("Registration failed!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.email}
                        required
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.username}
                        required
                    />
                    {formErrors.username && <span className="error-text">{formErrors.username}</span>}

                    <label htmlFor="favoriteTeam">Favorite Team:</label>
                    <select
                        id="favoriteTeam"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.favoriteTeam}
                        required
                    >
                        <option value="" disabled>Select your favorite team</option>
                        {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.favoriteTeam && <span className="error-text">{formErrors.favoriteTeam}</span>}

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.password}
                        required
                    />
                    {formErrors.password && <span className="error-text">{formErrors.password}</span>}

                    <label htmlFor="rePassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="rePassword"
                        autoComplete="rePassword"
                        placeholder="Repeat your password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.rePassword}
                        required
                    />
                    {formErrors.rePassword && <span className="error-text">{formErrors.rePassword}</span>}

                    <button type="submit" disabled={!isFormValid || loading}>
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <p className="signup-text">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

