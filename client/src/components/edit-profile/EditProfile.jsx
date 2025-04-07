import React, { useState, useEffect } from "react";
import './EditProfile.css';
import request from "../../utils/request.js";
import { useUserContext } from '../../contexts/UserContext.jsx';

export default function EditProfile() {
    const { user, authToken, updateUser } = useUserContext();
    const [showEditInfo, setShowEditInfo] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const initialFormData = {
        username: user.username || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const validateForm = () => {
        const errors = {};

        if (!formData.username || formData.username.length < 6) {
            errors.username = "Username must be at least 6 characters long";
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        if (showChangePassword) {
            if (!formData.oldPassword || formData.oldPassword.length < 6) {
                errors.oldPassword = "Old password must be at least 6 characters long";
            }
            if (!formData.newPassword || formData.newPassword.length < 6) {
                errors.newPassword = "New password must be at least 6 characters long";
            }
            if (formData.newPassword !== formData.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const { username, email } = formData;

        try {
            const updated = await request.put('http://localhost:5000/api/users/profile', {
                username,
                email
            }, authToken);

            updateUser(updated);
            alert('Profile updated successfully!');
            setShowEditInfo(false);
        } catch (err) {
            alert(`Error updating profile: ${err.message}`);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const { oldPassword, newPassword } = formData;

        try {
            await request.put('http://localhost:5000/api/users/profile/update-password', {
                oldPassword,
                newPassword
            }, authToken);

            alert('Password updated successfully!');
            setShowChangePassword(false);
        } catch (err) {
            alert(`Error updating password: ${err.message}`);
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setTouched({
            username: false,
            email: false,
            oldPassword: false,
            newPassword: false,
            confirmPassword: false
        });
        setShowEditInfo(false);
        setShowChangePassword(false);
    };

    const handleSwitchToChangePassword = () => {
        setShowEditInfo(false);
        setShowChangePassword(true);
        setFormData(initialFormData);
        setFormErrors({});
        setTouched({
            username: false,
            email: false,
            oldPassword: false,
            newPassword: false,
            confirmPassword: false
        });
    };
    
    const handleSwitchToEditInfo = () => {
        setShowChangePassword(false);
        setShowEditInfo(true);
        setFormData(initialFormData);
        setFormErrors({});
        setTouched({
            username: false,
            email: false,
            oldPassword: false,
            newPassword: false,
            confirmPassword: false
        });
    };

    return (
        <div className="user-dashboard">
            <h2>Profile Details</h2>
            <div className="account-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={handleSwitchToEditInfo}>
                    Edit Info
                </button>
                <button onClick={handleSwitchToChangePassword}>
                    Change Password
                </button>
            </div>

            {showEditInfo && (
                <div className="edit-section">
                    <h3>Edit Information</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="username">New Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.username && formErrors.username && (
                            <span className="error-text">{formErrors.username}</span>
                        )}

                        <label htmlFor="email">New Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.email && formErrors.email && (
                            <span className="error-text">{formErrors.email}</span>
                        )}

                        <div className="form-buttons">
                            <button type="submit" className="confirm" disabled={!isFormValid}>Save</button>
                            <button type="button" className="dismiss" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {showChangePassword && (
                <div className="edit-section">
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.newPassword && formErrors.newPassword && (
                            <span className="error-text">{formErrors.newPassword}</span>
                        )}

                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touched.confirmPassword && formErrors.confirmPassword && (
                            <span className="error-text">{formErrors.confirmPassword}</span>
                        )}

                        <div className="form-buttons">
                            <button type="submit" className="confirm" disabled={!isFormValid}>Save</button>
                            <button type="button" className="dismiss" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
