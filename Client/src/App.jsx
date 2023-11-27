import './App.css'
import ScrollToTop from "./components/scrollCorrector/scroll.jsx";
import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import Home from "./pages/home";
import Flights from "./pages/flights";
import {Button} from "@nextui-org/react";

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const submitHandler =async() =>{
    // const response = await fetch('http://localhost:5000',{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify({
    //     name:'Abhishek',
    //     age:20
    //   })
    // })
    // console.log(await response.status);
    // console.log(await response.json());
  }
  return (
    <Router>
      <ScrollToTop>
      {/* <Navbar /> */}

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
      </Routes>

      {/* <Footer /> */}
      </ScrollToTop>
    </Router>
  );
}

export default App
