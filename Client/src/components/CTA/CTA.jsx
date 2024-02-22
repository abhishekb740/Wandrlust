import './CTA.css';
import { Link } from "react-router-dom";
import ThingsHappen from "../../assets/images/thingshappen.png"

const CTA = () => {
    return (
        <div className="section-padding mx-40">
            <div className="flex cta">
                <div className="flex-col">
                    <h3 className='text-3xl font-semibold pb-2'>Let’s make things happen</h3>

                    <p className="pb-20 w-3/4">Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</p>
                    <Link to="/contact-us" className="btn-positivus">Contact us</Link>
                </div>
                <div className="flex items-center justify-start pt-20">
                    <img src={ThingsHappen} alt="thingshappen" style={{ width: "22rem" }} />
                </div>
            </div>
        </div>
    )
}

export default CTA;
