import React, { useState } from "react";
import './EditProfile.css'

export default function Profile() {
    const [showEditInfo, setShowEditInfo] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <div className="user-dashboard">
            <h2>Profile Details</h2>
            <div className="account-info">
                <p><strong>Username:</strong> User123</p>
                <p><strong>Email:</strong> user@example.com</p>
                <button onClick={() => {
                    setShowEditInfo(!showEditInfo);
                    setShowChangePassword(false);
                }}>
                    Edit Info
                </button>
                <button onClick={() => {
                    setShowChangePassword(!showChangePassword);
                    setShowEditInfo(false);
                }}>
                    Change Password
                </button>
            </div>

            {showEditInfo && (
                <div className="edit-section">
                    <h3>Edit Information</h3>
                    <form>
                        <label htmlFor="new-username">New Username</label>
                        <input type="text" id="new-username" placeholder="Enter new username" />

                        <label htmlFor="new-email">New Email</label>
                        <input type="email" id="new-email" placeholder="Enter new email" />

                        <div className="form-buttons">
                            <button type="submit" className="confirm">Save</button>
                            <button type="button" className="dismiss" onClick={() => setShowEditInfo(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {showChangePassword && (
                <div className="edit-section">
                    <h3>Change Password</h3>
                    <form>
                        <label htmlFor="current-password">Old Password</label>
                        <input type="password" id="current-password" placeholder="Enter old password" />

                        <label htmlFor="new-password">New Password</label>
                        <input type="password" id="new-password" placeholder="Enter new password" />

                        <div className="form-buttons">
                            <button type="submit" className="confirm">Save</button>
                            <button type="button" className="dismiss" onClick={() => setShowChangePassword(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
