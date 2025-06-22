import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../axios';

function HomePage() {
        useEffect(() => {
           API.get('/test')
            .then((res) => {
              console.log('Backend message:', res.data.message);
            })
            .catch((err) => {
              console.error('Error connecting backend:', err.message);
            });
        }, []);

  return (
    <div className="bg-gray-100 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <img src="src/assets/images/bike.jpg" alt="Hero Bike" className="w-full h-[80vh] object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-36">
          <Link to="/vehicle">
            <button className="bg-yellow-500 text-black font-semibold px-10 py-3 rounded hover:bg-orange-500 text-lg shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 text-center bg-white mx-4 md:mx-20 my-10 rounded-xl">
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-10 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
          About Us
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-8">
          <img src="src/assets/images/Pasted image.png" alt="Mechanic 1" className="w-[300px] h-[200px] object-cover rounded-md shadow-lg" />
          <img src="src/assets/images/Pasted image (2).png" alt="Mechanic 2" className="w-[300px] h-[200px] object-cover rounded-md shadow-lg" />
        </div>

        <p className="max-w-4xl mx-auto text-base font-bold text-black leading-relaxed text-justify px-4 text-lg">
          WrapForge is a web platform for vehicle modifications, providing a user-friendly space for enthusiasts to visualize, design, and customize their vehicles using tools like 3D modeling. <br />
          Combining automotive creativity with cutting-edge technology, WrapForge aims to make your dream vehicle a reality.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="bg-yellow-500 text-white px-10 py-10 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-justify md:text-left">
          <div>
            <h4 className="font-semibold mb-2 text-xl">Quick Links</h4>
            <ul className="space-y-1 text-lg">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vehicle">Vehicle</Link></li>
              <li><Link to="/store">Gallery</Link></li>
              <li><Link to="/about">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-2xl">Contact Us</h4>
            <p className="text-lg">Email: support@WrapForge.com</p>
            <p className="text-lg">Phone: +94 XXX XXX XXX</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-2xl">Follow Us</h4>
            <ul className="space-y-1 text-lg">
              <li>Facebook: @WrapForge</li>
              <li>Instagram: @WrapForge_mods</li>
              <li>YouTube: WrapForge Official</li>
              <li>Twitter: @WrapForge_design</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6 text-2xl">© 2025 WrapForge. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default HomePage;