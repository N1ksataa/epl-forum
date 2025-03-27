import { Routes, Route } from "react-router-dom";


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import PostsPage from "./components/post-page/PostsPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
    return (
        <>
            <div style={{ backgroundImage: `url("/images/background.jpg")`, minHeight: "100vh", overflow: "hidden", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
