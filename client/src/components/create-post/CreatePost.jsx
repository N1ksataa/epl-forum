import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import request from "../../utils/request.js";
import { useUserContext } from "../../contexts/UserContext";
import './CreatePost.css';

export default function CreatePost() {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        team: "",
        title: "",
        content: ""
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { authToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        request.get("http://localhost:5000/api/forum")
            .then(data => {
                const teamsData = data.map(item => item.team);
                setTeams(teamsData);
            })
            .catch(err => console.error("Failed to fetch teams", err));
    }, []);

    const validate = (field, value) => {
        switch (field) {
            case "title":
                return value.length < 6 ? "Title must be at least 6 characters" : "";
            case "content":
                return value.length < 10 ? "Content must be at least 10 characters" : "";
            case "team":
                return !value ? "Please select a team" : "";
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
                team: true,
                title: true,
                content: true
            });
            return;
        }

        try {
            await request.post(
                "http://localhost:5000/api/posts",
                {
                    title: formData.title,
                    content: formData.content,
                    team: formData.team,
                },
                authToken
            );

            setFormData({ team: "", title: "", content: "" });
            setTouched({});
            setErrors({});
            alert("Post created successfully!");
            navigate(`/posts/${formData.team}`);

        } catch (err) {
            console.error("Create post failed:", err.message);
            alert(err.message);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="team">Team:</label>
                <select
                    id="team"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                {touched.team && errors.team && <p className="error">{errors.team}</p>}

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

                <button type="submit" disabled={!isFormValid()}>Create Post</button>
            </form>
        </div>
    );
}
