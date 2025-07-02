import React, { useState } from 'react';
import axios from 'axios';
import logo from '/src/assets/images/WrapForge logo.png';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      setResponseMsg('Please agree to the terms.');
      return;
    }

    try {
      setLoading(true);
      setResponseMsg('');

      const token = localStorage.getItem('token'); // 🔐 JWT must be stored here after login
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = { message }; // Only sending message (sender info from token)
      const response = await axios.post('http://localhost:5000/api/contact', payload, config);

      setResponseMsg(response.data.message);
      setMessage('');
      setName('');
      setEmail('');
      setAgree(false);
    } catch (error) {
      setResponseMsg(
        error.response?.data?.message || 'Failed to send message. Try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ContactPage;