import { useState, useEffect } from "react";
import './CreatePost.css'

export default function CreatePost() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/forum")
            .then((res) => res.json())
            .then((data) => {
                const teamsData = data.map(item => item.team);
                setTeams(teamsData);
            })
            .catch((err) => console.error("Failed to fetch teams", err));
    }, []);

    return (
        <div className="create-post-container">
            <h2>Create Post</h2>
            <form>
                <label htmlFor="team">Team:</label>
                <select id="team">
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" placeholder="Enter post title" />

                <label htmlFor="content">Content:</label>
                <textarea id="content" placeholder="Enter post content"></textarea>


                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}
