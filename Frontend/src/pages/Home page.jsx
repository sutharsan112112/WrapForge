// import React from 'react';
import React, { useState } from 'react';
import '@google/model-viewer';
import Contact from './Contact page';
import AboutUs from './About us';
import Service from './Service page';
import Vehicle from "./Vehicle page";
import { FaTimes } from 'react-icons/fa';

import Login from '../auth/Login page'; // ✅ Make sure path is correct


function HomePage() {

    const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGetStarted = () => {
    setShowLoginModal(true); // ✅ Open login modal
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-[#1F2937] mt-5">
      {/* Hero Section */}
      <section id="/" className="relative">
        <model-viewer
        src="../src/assets/images/3d models/Car.glb"
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
onClick={handleGetStarted}
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
      {/* <section id="Vehicle" className="relative">
        <Vehicle />
      </section> */}

      {/*Service*/}
      <section id="service" className="relative">
        <Service />
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <Contact />
      </section>


            {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white h-[80vh] rounded-xl max-w-xl w-full relative shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <div className="p-6 full">
              <Login onClose={() => setShowLoginModal(false)} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HomePage;