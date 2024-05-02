import ScrollToTop from "./components/scrollCorrector/scroll.jsx";
import Home from "./pages/home";
import Flights from "./pages/flights";
import { Routes, Route } from "react-router-dom";
import Headers from "./pages/headers.jsx";
import Feeds from "./pages/feeds.jsx";
import AboutUs from "./pages/about-us.jsx";
import ContactUs from "./pages/contact-us.jsx";
import Location from "./pages/location.jsx";
import Profile from "./pages/profile.jsx";
import Post from "./pages/post.jsx";
import Signup from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import AdminDashboard from "./pages/admin-dashboard/admin-dashboard.jsx";
import AgencyDashboard from "./pages/agency-dashboard/agency-dashboard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/admin-dashboard/users.jsx";
import Posts from "./pages/admin-dashboard/posts.jsx";
import { useEffect, useState } from "react";
import { extractUserIdFromToken } from "./utils/extractUserIdFromToken.js";
import Agency from "./pages/agency.jsx";
import AgencyUpload from "./pages/AgencyForm.jsx";
import Programs from "./pages/agency-dashboard/programs.jsx";
import Admin from "./pages/Admin.jsx";
import AgencyLogin from "./pages/agencylogin.jsx";

function App() {
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserId(extractUserIdFromToken(token));
    }, []);
    return (
        <div>
            <Headers />
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/feeds" element={<Feeds />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/locations" element={<Location />} />
                    <Route path="/locations" element={<Location />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard/admin/" element={<AdminDashboard />} />
                    <Route path="/dashboard/admin/users" element={<Users />} />
                    <Route path="/dashboard/admin/posts" element={<Posts />} />
                    <Route path="/agency/login" element={<AgencyLogin />} />
                    <Route path="/agency" element={<Agency />} />
                    <Route path="/agencyForm" element={<AgencyUpload />} />
                    <Route path="/dashboard/agency" element={<AgencyDashboard />} />
                    <Route path="/dashboard/agency/programs" element={<Programs />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </ScrollToTop>
            <ToastContainer />
        </div>
    );
}

export default App;
