import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
    <>
        <nav className="shadow-md flex items-center justify-between fixed top-0 left-0 w-full bg-white z-50 px-6">
            <div className="logo items-center flex">
                <img src="/src/assets/images/WrapForge logo.png" alt="Logo" className="h-20 w-20" />
                <h1 className="text-2xl font-bold text-gray-800 items-center">WrapForge</h1>
            </div>

            <div>
                <Link to="/" className="ml-4 text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Home</Link>
                <Link to="/vehicle" className="ml-4 text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Vehicle</Link>
                <Link to="/service" className="ml-4 text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Service</Link>
                <Link to="/admin" className="ml-4 text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Admin</Link>
                <Link to="/partner" className="ml-4 text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Partner</Link>
                <Link to="/login" className="ml-4 bg-yellow-500 text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors">Login</Link>
            </div>
        </nav>
    </>
    );
}

export default Navbar;