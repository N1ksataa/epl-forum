import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Standings from './standings/Standings';
import { getForums, getForumStats, getTrendingPosts } from '../../api/forumApi.js';
import './PostsPage.css';

export default function PostsPage() {
    const [forums, setForums] = useState([]);
    const [stats, setStats] = useState({ posts: 0, messages: 0, members: 0, latestMember: '', latestMemberId: '' });
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const forumsData = await getForums();
                setForums(forumsData);

                const statsData = await getForumStats();
                setStats(statsData);

                const trendingPostsData = await getTrendingPosts();
                setTrendingPosts(trendingPostsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
                                <Link to={`/posts/${forum.team._id}`} className="team-name">
                                    {forum.team.name}’s Posts
                                </Link>
                                <div className="post-stats">
                                    <span>Posts: {forum.postCount}</span>
                                    <span>Comments: {forum.commentCount}</span>

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
                                                <Link to={`/posts/${forum.team._id}/${forum.lastPost._id}`} className="last-post-link">
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
                        {trendingPosts.map(post => (
                            <li key={post._id}>
                                <Link to={`/posts/${post.team._id}/${post._id}`}>
                                    {post.title.length > 30 ? post.title.substring(0, 27) + '...' : post.title}
                                </Link>
                                &nbsp;- {post.commentCount} Comments
                            </li>
                        ))}

                    </ul>
                </section>

                <section className="forum-stats">
                    <h2>📈 Forum Statistics</h2>
                    <p>Posts: {stats.posts}</p>
                    <p>Comments: {stats.messages}</p>
                    <p>Members: {stats.members}</p>
                    <p>Latest Member:
                        {stats.latestMemberId ? (
                            <Link to={`/profile/${stats.latestMemberId}`} className="username-link">
                                {` ${stats.latestMember}`}
                            </Link>
                        ) : (
                            ''
                        )}
                    </p>
                </section>
            </aside>
        </div>
    );
}
