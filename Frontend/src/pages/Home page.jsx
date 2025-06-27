import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/RS 200.jpg';

function HomePage() {
  // State for the agreement checkbox
  const [agree, setAgree] = useState(false);

  return (
    <div className="bg-gray-100 mt-20 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <img src="/src/assets/images/bike.jpg" alt="Hero Bike" className="w-full h-[80vh] object-cover bg-gray-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-36">
          <Link to="/vehicle">
            <button className="bg-yellow-500 text-black font-semibold px-10 py-3 rounded hover:bg-orange-500 text-lg shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/** About Us Section */}
      <section className="py-16 px-4 text-center bg-white mx-4 md:mx-20 my-10 rounded-xl">
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-10 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          About Us
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-8">
          <img src="src/assets/images/about 1.png" alt="Mechanic 1" className="w-[300px] h-[200px] object-cover rounded-md shadow-lg" />
          <img src="src/assets/images/about 2.png" alt="Mechanic 2" className="w-[300px] h-[200px] object-cover rounded-md shadow-lg" />
        </div>

        <p className="max-w-4xl mx-auto text-base font-bold text-black leading-relaxed text-justify px-4 text-lg">
          WrapForge is a web platform for vehicle modifications, providing a user-friendly space for enthusiasts to visualize, design, and customize their vehicles using tools like 3D modeling. <br />
          Combining automotive creativity with cutting-edge technology, WrapForge aims to make your dream vehicle a reality.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-10 tracking-wide text-center" style={{ fontFamily: 'Georgia, serif' }}>
          Contact Us
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Form */}
          <form className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-black">Contact Admin</h3>
            <p className="mb-6 text-lg font-semibold">Send us your message</p>
            <div className="mb-4 text-left">
              <label className="block font-semibold mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2"
                required
              />
              <label htmlFor="agree" className="text-sm">
                I agree to receive communications from WrapForge.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded transition"
            >
              Send Message
            </button>
          </form>
          {/* Right Side Ad */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-100 h-100 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex items-center justify-center text-yellow-700 font-bold text-xl">
              <img src={logo} alt="" className="mx-auto w-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;