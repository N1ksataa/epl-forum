import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PostDetails.css";

export default function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
                
                if (!response.ok) {
                    throw new Error('Post not found');
                }

                const data = await response.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
                navigate("/404");
            }
        }

        fetchPost();
    }, [postId, navigate]);

    if (!post) {
        return <div>Post not found</div>;
    }

    const handleEditPost = () => {
        navigate(`/edit-post/${postId}`);
    };

    const handleEditComment = (commentId) => {
        navigate(`/edit-comment/${commentId}`);
    };

    return (
        <div className="post-details">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
                <span>
                    By <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link>
                </span>
                <span> | Team: {post.team.name}</span>
                <span> | Last updated: {new Date(post.updatedAt).toLocaleString()}</span>
                    <button onClick={handleEditPost}>Edit Post</button>
            </div>

            <h3>Replies</h3>
            <ul className="comments-list">
                {post.comments.map((comment) => (
                    <li key={comment._id} className="comment">
                        <p>{comment.text}</p>
                        <span>
                            By <Link to={`/profile/${comment.userId.username}`}>{comment.userId.username}</Link> | {new Date(comment.createdAt).toLocaleString()}
                        </span>
                            <button onClick={() => handleEditComment(comment._id)}>Edit Comment</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
