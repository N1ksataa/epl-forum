import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Home from "./components/home/Home";
import CreatePost from "./components/create-post/CreatePost";
import PostsPage from "./components/posts-page/PostsPage";
import PostsByTeam from "./components/posts-by-team/PostsByTeam";
import ProfilePage from "./components/profile-page/ProfilePage";
import EditProfile from "./components/edit-profile/EditProfile";
import PostDetails from "./components/post-details/PostDetails";
import NotFound from "./components/404/NotFound";

import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import { UserProvider } from "./contexts/UserContext";

function App() {
    return (
        <div style={{ backgroundImage: `url("/images/background.jpg")`, minHeight: "100vh", overflow: "hidden", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
            <UserProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/posts/:teamId" element={<PostsByTeam />} />
                    <Route path="/posts/:teamId/:postId" element={<PostDetails />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />

                    <Route element={<GuestGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>


                    <Route element={<AuthGuard />}>
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>

                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </UserProvider>
        </div>
    );
}

export default App;
