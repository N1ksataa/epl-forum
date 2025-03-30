import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
                const userData = await userRes.json();
                setUser(userData);

                const postsRes = await fetch(`http://localhost:5000/api/posts/user/${userId}`);
                const postsData = await postsRes.json();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        }

        fetchData();
    }, [userId]);


    return (
        <div className="profile-container">
            {user ? (
                <>
                    <div className="profile-header">
                        <h2>{user.username}'s Profile</h2>
                        <p>Email: {user.email}</p>
                        {user.favoriteTeam && (
                            <p>
                                Favorite Team: {user.favoriteTeam.name}
                            </p>
                        )}
                        <Link to="/edit-profile" className="edit-profile-btn">Edit Profile</Link>
                    </div>

                    <h3>Recent Posts</h3>
                    {posts.length > 0 ? (
                        <ul className="user-posts">
                            {posts.map((post) => (
                                <li key={post._id} className="post-item">
                                    <div className="post-content">
                                        <Link to={`/posts/${post.team._id}/${post._id}`} className="post-title">
                                            {post.title}
                                        </Link>
                                        <p className="post-meta">
                                            By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="replies">{post.comments.length} Replies</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-posts">No posts yet.</p>
                    )}
                </>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}
