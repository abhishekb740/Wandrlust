import Hero from '../components/Hero/Hero';
import CTA from '../components/CTA/CTA';
import '../index.css';
import Footer from '../components/FooterHome/Footer';

export default function Home() {

    return (
        <div>
            <Hero />
            <CTA />
            <Footer />
        </div>
    );
}
