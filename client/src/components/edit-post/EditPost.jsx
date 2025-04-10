import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, editPost } from "../../api/postApi.js";
import { useUserContext } from "../../contexts/UserContext.jsx";
import '../create-post/CreatePost.css';

export default function EditPost() {
    const [formData, setFormData] = useState({
        team: "",
        title: "",
        content: ""
    });
    const [selectedTeamName, setSelectedTeamName] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { authToken, user } = useUserContext();
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPostById(postId);

                if (user._id !== data.author._id) {
                    navigate("/404");
                    return;
                }

                setFormData({
                    team: data.team._id,
                    title: data.title,
                    content: data.content,
                });
                setSelectedTeamName(data.team.name);
            } catch (err) {
                console.error("Failed to fetch post:", err);
                navigate("/404");
            }
        }

        if (user) {
            fetchPost();
        }
    }, [postId, navigate, user]);

    const validate = (field, value) => {
        switch (field) {
            case "title":
                return value.length < 6 ? "Title must be at least 6 characters" : "";
            case "content":
                return value.length < 10 ? "Content must be at least 10 characters" : "";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validate(name, formData[name]) }));
    };

    const isFormValid = () =>
        Object.values(formData).every(val => val) &&
        Object.values(errors).every(err => !err);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        for (const key in formData) {
            const error = validate(key, formData[key]);
            if (error) newErrors[key] = error;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched({
                title: true,
                content: true
            });
            return;
        }

        try {
            await editPost(
                postId,
                {
                    title: formData.title,
                    content: formData.content,
                },
                authToken
            );

            alert("Post updated successfully!");
            navigate(`/posts/${formData.team}`);
        } catch (err) {
            console.error("Update failed:", err.message);
            alert(err.message);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="team">Team:</label>
                <input
                    type="text"
                    id="team"
                    name="team"
                    value={selectedTeamName}
                    readOnly
                    disabled
                    className="disabled-team-input"
                />
                <input type="hidden" name="team" value={formData.team} />

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.title && errors.title && <p className="error">{errors.title}</p>}

                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Enter post content"
                    value={formData.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.content && errors.content && <p className="error">{errors.content}</p>}

                <button type="submit" disabled={!isFormValid()}>Update Post</button>
            </form>
        </div>
    );
}
