import React from 'react';
import '@google/model-viewer';
import Contact from './Contact page';
import AboutUs from './About us';
import Service from './Service page';
import Vehicle from "./Vehicle page";

function HomePage() {
  return (
    <div className="bg-gray-100 mt-20 font-sans text-gray-800">
      {/* Hero Section */}
      <section id="home" className="relative">
        <model-viewer
          src="../src/assets/images/R15 V3.glb"
          alt="Hero Bike"
          camera-controls
          auto-rotate
          autoplay
          camera-orbit="45deg 70deg 2.5m"
          disable-zoom
          disable-pan
          disable-tap
          shadow-intensity="1"
          environment-image="neutral"
          style={{ width: '100%', height: '80vh' }}
        ></model-viewer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-36">
            <button
             onClick={() => {
              const vehicleSection = document.getElementById('Vehicle');
              if (vehicleSection) {
              vehicleSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-yellow-500 text-black font-semibold px-10 py-3 rounded hover:bg-orange-500 text-lg shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Aboutus */}
      <section id="aboutus" className="relative">
        <AboutUs />
      </section>

      {/* Vehicle */}
      <section id="Vehicle" className="relative">
        <Vehicle />
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <Contact />
      </section>

      <section id="service" className="relative">
        <Service />
      </section>
    </div>
  );
}

export default HomePage;