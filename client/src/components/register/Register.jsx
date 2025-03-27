import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Register.css'

export default function Register() {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: "",
        favoriteTeam: ""
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/forum")
            .then((res) => res.json())
            .then((data) => {
                const teamsData = data.map(item => item.team);
                setTeams(teamsData);
            })
            .catch((err) => console.error("Failed to fetch teams", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            console.log("User registered successfully");
        } else {
            console.error("Registration failed");
        }
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" onChange={handleChange} />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" onChange={handleChange} />

                <label htmlFor="favoriteTeam">Favorite Team:</label>
                <select id="favoriteTeam" onChange={handleChange}>
                    <option value="">Select your favorite team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} />

                <label htmlFor="rePassword">Confirm Password:</label>
                <input type="password" id="rePassword" placeholder="Confirm your password" onChange={handleChange} />

            

                <button type="submit">Sign Up</button>
            </form>
            <p className="signup-text">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}