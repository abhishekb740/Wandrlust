import HeroImage from "../../assets/images/hero.png";
// import { IconScroll } from '../../components';
import './Hero.css';
import { Link } from "react-router-dom";
import '../../App.css'

const Hero = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    return (
        <div className="hero">
            <div className="flex items-center mx-40 mt-12">
                <div className="flex-col w-3/4">
                    <h1 className="title">  Navigating the globe, connecting hearts, and building bridges of shared experiences. </h1>
                    <p className="py-4">Embark on a shared expedition, connect with like-minded explorers, and weave the vibrant threads of your global adventures with Wandrlust - the ultimate travel companion.</p>
                    <div className="flex gap-4">
                        {!isUserLoggedIn && (
                        <>
                            <Link to="/signup" className="btn-positivus">
                            Sign-up
                            </Link>
                            <Link to="/signin" className="btn-positivus">
                            Sign-in
                            </Link>
                        </>
                        )}
                    </div>
                </div>
                <div className="">
                    <img className="img-fluid" src={HeroImage} alt="design" />
                </div>
            </div>


            {/* <IconScroll /> */}
        </div>

    )
}

export default Hero