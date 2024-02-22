import './Footer.css';
import { images, data } from '../../constants'
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className='mx-40'>
            <div className="flex justify-between">
                <div className="col-md-2 col-12">
                    {/* <img src={images.logofooter} alt="logo" className="img-fluid" /> */}
                    <div className='white text-2    xl'>Wandrlust</div>
                </div>
                <div className="col-md-8 col-12 ">
                    <ul className="navbar-footer">
                        {data.Menu.slice(0).map((item, index) => (
                            <li> <a href={item.link} >{item.text}</a></li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-5"><BsFacebook /> <BsTwitter /> <BsLinkedin /></div>
            </div>
            <div className="row">

                <div className="col-md-4 col-12">
                    <ul className="info-contact">
                        <li> <span>Contact us:</span></li>
                        <li>Email: info@wandrlust.com</li>
                        <li>Phone: 638-676-7908</li>
                        <li>Address: Indian Institute of Information Technology
                            Sri City, Andhra Pradesh 517646</li>
                    </ul>
                </div>
                <div className="col-md-8 col-12">

                    <form className="row form-news">
                        <div className="col-lg-6 col-12">
                            <input type="email" className="form-control" id="email" placeholder="Email" />
                        </div>
                        <div className="col-lg-6 col-12 mt-3 mt-lg-0">
                            <button type="submit" className="btn-positivus w-100">Subscribe to news</button>
                        </div>
                    </form>

                </div>

                <div className="rights">
                    <p>© 2024 Wandrlust. All Rights Reserved.</p>
                    <p><a href="#" alt="Privacy Policy">Privacy Policy</a></p>

                </div>
            </div>
        </footer>
    )
}

export default Footer