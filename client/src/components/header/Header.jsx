import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Header.css'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 915) {
                closeMenu();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-center">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/my-team-posts">Posts About My Team</Link></li>
                    <li><Link to="/create-post">Create Post</Link></li>
                    <li><Link to="/my-posts">My Posts</Link></li>
                </ul>
            </div>

            <div className="nav-right">
                <ul>
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={`menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/my-team-posts" onClick={closeMenu}>Posts About My Team</Link></li>
                    <li><Link to="/create-post" onClick={closeMenu}>Create Post</Link></li>
                    <li><Link to="/my-posts" onClick={closeMenu}>My Posts</Link></li>
                    <li><Link to="/login" onClick={closeMenu}>Log in</Link></li>
                    <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                    <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
}
