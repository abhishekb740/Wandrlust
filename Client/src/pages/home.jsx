import '../index.css';
import  {Button}  from '@nextui-org/react';

export default function Home() {

  const airlines = ["airasia", "airindia", "goair", "indigo", "spicejet", "vistara"];

    return (
      <div>
        {/* -------------------------------------------------------------------------- */
        /*                                HERO SECTION                                */
        /* -------------------------------------------------------------------------- */}
        <section className='hero-section'>
          <div className='hero-content'>
            <h1 className='hero-title'>Affordable flight tickets last minute.</h1>
            <h3 className='hero-subtitle'>Search the best flight deals for free. </h3>
            <Button color='primary' onClick={() => {window.location.href="/SkyClub/#/flights"}}>Search Flights</Button>
          </div>
        </section>


        {/* -------------------------------------------------------------------------- */
        /*                              BENEFITS SECTION                              */
        /* -------------------------------------------------------------------------- */}
        


        {/* -------------------------------------------------------------------------- */
        /*                              AIRLINES SECTION                              */
        /* -------------------------------------------------------------------------- */}
      </div>
    );
  }
  