import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h1>PREMIER LEAGUE</h1>
        <h2>FAN FORUM</h2>
        <p>Join the discussion, share your opinions, and stay updated.</p>
        <Link to="/posts" className="explore-button">Explore Discussions</Link>
      </div>
    </div>
  );
}