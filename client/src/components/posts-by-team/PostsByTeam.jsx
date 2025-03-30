import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./PostsByTeam.css";

export default function PostsByTeam() {
    const { teamId } = useParams();
    const [posts, setPosts] = useState([]);
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/team/${teamId}`)
            .then((res) => {
                if (!res.ok) {
                    navigate("/404");
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                if (data.length > 0) {
                    setTeam(data[0].team);
                }
            })
            .catch((err) => console.error("Failed to fetch posts", err));
    }, [teamId, navigate]);


    return (
        <div className="posts-container">
            {team && (
                <div className="team-header">
                    <img src={team.logo} alt={team.name} className="team-logo" />
                    <h2>Posts about {team.name}</h2>
                    <img src={team.logo} alt={team.name} className="team-logo" />
                </div>
            )}

            {posts.length > 0 ? (
                <ul className="posts-list">
                    {posts.map((post) => {
                        const lastComment = post.comments.length > 0 ? post.comments[post.comments.length - 1] : null;

                        return (
                            <li key={post._id} className="post-item">
                                <div className="post-content">
                                    <Link to={`/posts/${teamId}/${post._id}`} className="post-title">
                                        {post.title}
                                    </Link>
                                    <p className="post-meta">
                                        By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className={`replies ${post.comments.length === 0 ? 'center' : ''}`}>
                                    {post.comments.length > 0 ? `${post.comments.length} Replies` : "No replies"}
                                </div>

                                {lastComment && (
                                    <div className="post-stats">
                                        <div className="last-update">
                                            <div>Last updated: {new Date(post.updatedAt).toLocaleString()}</div>
                                            <div>
                                                by{" "}
                                                <Link to={`/profile/${lastComment.userId?._id}`} className="post-user">
                                                    {lastComment.userId?.username?.length > 23
                                                        ? lastComment.userId.username.substring(0, 20) + "..."
                                                        : lastComment.userId?.username || "Unknown"}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="no-posts">No posts yet.</p>
            )}
        </div>
    );
}
