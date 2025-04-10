import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostsByTeam } from "../../api/postApi";
import "./PostsByTeam.css";

export default function PostsByTeam() {
    const { teamId } = useParams();
    const [posts, setPosts] = useState([]);
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostsByTeam(teamId);
                setPosts(data);
                if (data.length > 0) {
                    setTeam(data[0].team);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                navigate('/404');
            }
        };

        fetchPosts();
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
                                        {post.title.length > 40 ? post.title.slice(0, 37) + "..." : post.title}
                                    </Link>
                                    <p className="post-meta">
                                        By <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link> on {new Date(post.createdAt).toLocaleDateString()}
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
