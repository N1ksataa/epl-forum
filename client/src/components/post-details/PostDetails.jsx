import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { getPostById, deletePost, deleteComment, createComment } from "../../api/postApi.js";
import "./PostDetails.css";

export default function PostDetails() {
    const { postId, teamId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const { user, authToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPostById(postId);

                if (data.team._id !== teamId) {
                    throw new Error("Team ID mismatch");
                }

                setPost(data);
            } catch (error) {
                setError(error.message);
                navigate("/404");
            }
        }

        fetchPost();
    }, [postId, teamId, navigate]);

    const handleEditPost = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleEditComment = (postId, commentId) => {
        navigate(`/edit-comment/${postId}/${commentId}`);
    };

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId, authToken);
            navigate(`/posts/${teamId}`);
        } catch (err) {
            setError('Error deleting post');
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await deleteComment(postId, commentId, authToken);
            setPost((prevPost) => ({
                ...prevPost,
                comments: prevPost.comments.filter((comment) => comment._id !== commentId),
            }));
        } catch (err) {
            setError('Error deleting comment');
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                const newCommentData = await createComment(postId, newComment, authToken);

                setPost((prevPost) => ({
                    ...prevPost,
                    comments: [...prevPost.comments, newCommentData],
                }));

                setNewComment('');
            } catch (error) {
                setError('Failed to add comment');
            }
        }
    };


    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="post-details">
            <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <div className="post-meta">
                    <span>
                        By <Link to={`/profile/${post.author._id}`}>{post.author.username} </Link>
                    </span>
                    <span> | Team: {post.team.name} </span>
                    | Posted:&nbsp;
                            {new Date(post.createdAt).toLocaleString()}
                    <span> | Last updated: {new Date(post.updatedAt).toLocaleString()}</span>
                </div>
                <p className="post-content">{post.content}</p>
                {user?._id === post.author._id && (
                    <div className="post-actions">
                        <button onClick={() => handleEditPost(post._id)}></button>
                        <button onClick={() => handleDeletePost(post._id)}></button>
                    </div>
                )}
            </div>

            <h3>Replies</h3>
            <ul className="comments-list">
                {post.comments.map((comment) => (
                    <li key={comment._id} className="comment">
                        <p>{comment.text}</p>
                        {user?._id === comment.userId._id && (
                            <div className="comment-actions">
                                <button onClick={() => handleEditComment(post._id, comment._id)}></button>
                                <button onClick={() => handleDeleteComment(post._id, comment._id)}></button>
                            </div>
                        )}
                        <span>
                            By <Link to={`/profile/${comment.userId._id}`}>{comment.userId.username}</Link> | Posted:&nbsp;
                            {new Date(comment.createdAt).toLocaleString()}
                            {comment.updatedAt && (
                                <> | Last updated: {new Date(comment.updatedAt).toLocaleString()}</>
                            )}
                        </span>
                    </li>
                ))}
            </ul>


            {user && (
                <div className="new-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                        Submit Comment
                    </button>
                </div>
            )}
        </div>
    );
}
