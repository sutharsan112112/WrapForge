import React from 'react';
import '@google/model-viewer';
import Contact from './Contact page';
import AboutUs from './About us';
import Service from './Service page';
import Vehicle from "./Vehicle page";

function HomePage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen text-[#1F2937] mt-5">
      {/* Hero Section */}
      <section id="/" className="relative">
        <model-viewer
        src="../src/assets/images/Car.glb"
        alt="Hero Bike"
        auto-rotate
        autoplay
        camera-controls={false}
        disable-pan
        disable-tap
        shadow-intensity="1"
        environment-image="neutral"
        style={{ width: '100%', height: '80vh' }}
        min-camera-orbit="auto auto 2m"
        max-camera-orbit="auto auto 10m"
        ></model-viewer>

        <div className="absolute inset-x-0 bottom-20 flex justify-center">
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

      {/*Service*/}
      <section id="service" className="relative">
        <Service />
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <Contact />
      </section>
    </div>
  );
}

export default HomePage;