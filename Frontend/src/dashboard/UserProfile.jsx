import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Please login first.");
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      {/* 🔙 Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back
            </button>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-2">Here’s Your Userprofile Overview.</p>
        </header>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Name</p>
            <p className="text-lg font-semibold text-blue-600">{user.name}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Email</p>
            <p className="text-lg font-semibold text-green-600">{user.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Role</p>
            <p className="text-lg font-semibold text-purple-600 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Summary Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-blue-600">24</span>
            <span className="text-gray-500 mt-2">Projects</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-600">12</span>
            <span className="text-gray-500 mt-2">Tasks</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-purple-600">5</span>
            <span className="text-gray-500 mt-2">Notifications</span>
          </div>
        </div>

        {/* Activity Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Completed Task: Design Homepage</span>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Added new project: Portfolio Website</span>
              <span className="text-sm text-gray-400">1 day ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Updated profile information</span>
              <span className="text-sm text-gray-400">3 days ago</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
