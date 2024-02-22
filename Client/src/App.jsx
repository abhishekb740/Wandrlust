import ScrollToTop from "./components/scrollCorrector/scroll.jsx";
import Home from "./pages/home";
import Flights from "./pages/flights";
import { Routes, Route } from 'react-router-dom';
import Headers from './pages/headers.jsx';
import Feeds from './pages/feeds.jsx';
import AboutUs from './pages/about-us.jsx';
import ContactUs from './pages/contact-us.jsx';
import Location from './pages/location.jsx';
import Profile from './pages/profile.jsx';
import Post from './pages/post.jsx';
import Signup from './pages/signup.jsx';
import Signin from './pages/signin.jsx';
import AdminDashboard from './pages/admin-dashboard/admin-dashboard.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/admin-dashboard/users.jsx';
import Posts from './pages/admin-dashboard/posts.jsx';
function App() {
    // const submitHandler = async () => {
    //   const response = await fetch('http://localhost:5000', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: 'Abhishek',
    //       age: 20
    //     })
    //   })
    //   console.log(await response.status);
    //   console.log(await response.json());
    // }
    return (
        <div>
            <Headers />
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path='/feeds' element={<Feeds />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                    <Route path='/locations' element={<Location />} />
                    <Route path='/locations' element={<Location />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/post' element={<Post />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/dashboard/admin/' element={<AdminDashboard />} />
                    <Route path='/dashboard/admin/users' element={<Users />} />
                    <Route path='/dashboard/admin/posts' element={<Posts />} />
                    {/* <Route path='/dashboard/admin' element={<AdminDashboard />} /> */}
                    {/* <Route path='/dashboard/agency' element={<AgencyDashboard/>} /> */}
                </Routes>
            </ScrollToTop>
            <ToastContainer />
        </div>
    );
}

export default App
