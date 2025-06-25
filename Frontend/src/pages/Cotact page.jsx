import React, { useState } from 'react';
import logo from '/src/assets/images/WrapForge logo.png';

const ContactPage = () => {
  // form data states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert('Please agree to receive communications');
      return;
    }

    setLoading(true);
    setResponseMsg('');

    // API request body
    const body = { name, email, message };

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setResponseMsg('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
        setAgree(false);
      } else {
        const data = await res.json();
        setResponseMsg('Failed to send message: ' + (data.message || res.statusText));
      }
    } catch (error) {
      setResponseMsg('Error sending message: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3fb] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <div className="text-center mb-6">
          <img src={logo} alt="WrapForge Logo" className="mx-auto w-20" />
          <h2 className="mt-3 text-2xl font-bold text-[#2f1c13]">Contact Admin</h2>
          <p className="text-gray-600 text-sm mt-1">Send us your message</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message here..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Checkbox */}
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center space-x-2 text-black font-semibold">
              <input
                type="checkbox"
                className="accent-yellow-500"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <span>I agree to receive communications from WrapForge.</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-orange-500 text-black font-semibold py-2 rounded-md transition duration-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {/* Response message */}
          {responseMsg && (
            <p className="mt-4 text-center text-sm text-red-600">{responseMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;