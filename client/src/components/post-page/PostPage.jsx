import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Standings from './standings/Standings';
import './PostsPage.css';

export default function PostsPage() {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/posts/forums')
            .then(response => response.json())
            .then(data => setForums(data))
            .catch(error => console.error('Error fetching forums:', error));
    }, []);

    return (
        <div className="posts-page-container">
            <main className="main-content">

                <div className="topic-lists">
                    {forums.map(forum => (
                        <li key={forum.team._id} className="forum-item">
                            <div className="forum-row">
                                <img
                                    src={forum.team.logo}
                                    alt={forum.team.name}
                                    className="team-logo"
                                />
                                <Link to={`/forums/${forum.team._id}`} className="team-name">
                                    {forum.team.name}’s Posts
                                </Link>
                                <div className="post-stats">
                                    <span>Posts: {forum.postCount}</span>
                                    <span>Messages: {forum.commentCount + forum.postCount}</span>
                                </div>
                                <div className="last-post">
                                    {forum.lastPost ? (
                                        <>
                                            <span className="last-post-author">
                                                Last post by
                                                <Link to={`/profile/${forum.lastPost.author._id}`} className="username-link">
                                                    {forum.lastPost.author.username.length > 11
                                                        ? ` ${forum.lastPost.author.username.substring(0, 11) + '...'}`
                                                        : ` ${forum.lastPost.author.username}`}
                                                </Link>
                                            </span>
                                            <span className="last-post-title">
                                                <Link to={`/post/${forum.lastPost._id}`} className="last-post-link">
                                                    {forum.lastPost.title.length > 23
                                                        ? forum.lastPost.title.substring(0, 23) + '...'
                                                        : forum.lastPost.title}
                                                </Link>
                                            </span>
                                            <span className="last-post-date">
                                                on {`${new Date(forum.lastPost?.createdAt).toLocaleString('en-US', {
                                                    month: 'short', day: '2-digit', year: 'numeric'
                                                }).replace(',', '')} at ${new Date(forum.lastPost?.createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                                                })}`}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="last-post-title no-posts">
                                            No posts yet
                                        </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </main>

            <aside className="sidebar">
                <section className="standings-section">
                    <h2>🏆 Premier League Table</h2>
                    <Standings />
                </section>

                <section className="trending-topics">
                    <h2>🔥 Trending Posts</h2>
                    <ul>
                        <li><a href="#">Post 1</a> - 4K Replies</li>
                        <li><a href="#">Post 2</a> - 11K Replies</li>
                        <li><a href="#">Post 3</a> - 1K Replies</li>
                        <li><a href="#">Post 4</a> - 48 Replies</li>
                        <li><a href="#">Post 5</a> - 1K Replies</li>
                    </ul>
                </section>

                <section className="forum-stats">
                    <h2>📈 Forum Statistics</h2>
                    <p>Threads: 14,122</p>
                    <p>Messages: 2,289,319</p>
                    <p>Members: 5,053</p>
                    <p>Latest Member: niksata</p>
                </section>
            </aside>
        </div>
    );
}
