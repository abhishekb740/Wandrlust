import './App.css'
import ScrollToTop from "./components/scrollCorrector/scroll.jsx";
import Home from "./pages/home";
import Flights from "./pages/flights";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Headers from './pages/headers.jsx';
import Feeds from './pages/feeds.jsx';
import AboutUs from './pages/about-us.jsx';
import ContactUs from './pages/contact-us.jsx';
import Location from './pages/location.jsx';
import Profile from './pages/profile.jsx';

function App() {
  // const submitHandler =async() =>{
  //   const response = await fetch('http://localhost:5000',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({
  //       name:'Abhishek',
  //       age:20
  //     })
  //   })
  //   console.log(await response.status);
  //   console.log(await response.json());
  // }
  return (
    <Router>
      <ScrollToTop>
      <Headers/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/flights" element={<Flights />}/>
          <Route path='/feeds' element={<Feeds/>}/>
          <Route path='/about-us' element={<AboutUs/>} />
          <Route path='/contact-us' element={<ContactUs/>} />
          <Route path='/locations' element={<Location/>} />
          <Route path='/locations' element={<Location/>} />
          <Route path='/profile'  element={<Profile/>} />
      </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App
