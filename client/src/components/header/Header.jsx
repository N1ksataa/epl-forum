import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import './Header.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useUserContext();

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
                    {user && ( 
                        <>
                            <li><Link to="/create-post">Create Post</Link></li>
                            <li><Link to={`/posts/${user.favoriteTeam}`}>Posts About My Team</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <div className="nav-right">
                <ul>
                    {!user ? ( 
                        <>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to={`/profile/${user._id}`}>{user.username}'s Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    )}
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
                    <li><Link to="/posts" onClick={closeMenu}>Posts</Link></li>
                    {user && (
                        <>
                            <li><Link to="/create-post" onClick={closeMenu}>Create Post</Link></li>
                            <li><Link to={`/posts/${user.favoriteTeam}`} onClick={closeMenu}>Posts About My Team</Link></li>
                        </>
                    )}
                    {!user ? (
                        <>
                            <li><Link to="/login" onClick={closeMenu}>Log in</Link></li>
                            <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to={`/profile/${user._id}`} onClick={closeMenu}>Profile</Link></li>
                            <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
