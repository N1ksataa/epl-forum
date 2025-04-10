import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import { useUserContext } from "../../contexts/UserContext";
import "./EditComment.css";

export default function EditComment() {
    const { postId, commentId } = useParams();
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState("");
    const [post, setPost] = useState(null);
    const { authToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchComment() {
            try {
                const commentResponse = await request.get(
                    `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
                    authToken
                );
                setCommentText(commentResponse.text);

                const postResponse = await request.get(
                    `http://localhost:5000/api/posts/${postId}`,
                    authToken
                );
                setPost(postResponse);
            } catch (err) {
                setError("Failed to load comment or post");
            }
        }

        fetchComment();
    }, [postId, commentId, authToken]);

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            setError("Comment text cannot be empty");
            return;
        }

        try {
            const response = await request.put(
                `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
                { commentText },
                authToken
            );

            navigate(`/posts/${post.team._id}/${postId}`);
        } catch (err) {
            setError("Failed to edit comment: " + err.message);
        }
    };

    return (
        <div className="edit-comment-container">
            <h2>Edit Comment</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} noValidate>
                <textarea
                    value={commentText}
                    onChange={handleChange}
                    placeholder="Edit your comment"
                    rows="4"
                />
                <button type="submit" disabled={!commentText.trim()}>Save Changes</button>
            </form>
        </div>
    );
}
