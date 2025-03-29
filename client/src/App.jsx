import { Routes, Route } from "react-router-dom";


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import CreatePost from "./components/create-post/CreatePost"
import PostsPage from "./components/posts-page/PostsPage";
import PostsByTeam from "./components/posts-by-team/PostsByTeam";

function App() {
    return (
        <>
            <div style={{ backgroundImage: `url("/images/background.jpg")`, minHeight: "100vh", overflow: "hidden", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/posts/:teamId" element={<PostsByTeam />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
