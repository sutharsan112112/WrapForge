import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customizations, setCustomizations] = useState([]);
  const [selectedCustomization, setSelectedCustomization] = useState(null);
  const [partners, setPartners] = useState([]);
  const [showPartners, setShowPartners] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Please login first.");
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    axios.get('http://localhost:5000/api/customizations', {
      headers: {
        Authorization: `Bearer ${parsedUser.token}`,
      },
    })
      .then(res => setCustomizations(res.data || []))
      .catch(err => {
        console.error('Error fetching customizations:', err);
        setCustomizations([]);
      });
  }, [navigate]);

  const fetchPartners = useCallback(async (customization) => {
    if (!user?.token) {
      alert('No auth token found. Please login again.');
      return;
    }

    setSelectedCustomization(customization); // 🔥 Set selected customization
    try {
      const res = await axios.get('http://localhost:5000/api/admin/partners', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPartners(res.data || []);
      setShowPartners(true);
    } catch (err) {
      console.error('Failed to fetch partners:', err);
      alert('Unable to fetch partner list.');
    }
  }, [user]);

  const sendRequestToPartner = useCallback(async (partnerId) => {
    if (!selectedCustomization) {
      alert('Please select a customization first.');
      return;
    }

    if (!user?.token) {
      alert('Please login again.');
      return;
    }

    setLoadingRequest(true);
    try {
      await axios.post('http://localhost:5000/api/requests/send', {
        partnerId,
        customizationId: selectedCustomization._id,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Request sent successfully to partner!');
      setShowPartners(false);
    } catch (err) {
      console.error('Failed to send request:', err);
      alert('Failed to send request to partner.');
    } finally {
      setLoadingRequest(false);
    }
  }, [selectedCustomization, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-2">Here’s Your Vehicle Customization Gallery.</p>
        </header>

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

        {/* 🚗 Customization Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customizations.length === 0 ? (
            <p className="text-gray-500">No recent customizations found.</p>
          ) : (
            customizations.map((custom) => (
              <div
                key={custom._id}
                className="bg-white rounded-xl shadow-md p-5 transform transition hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  Vehicle: <span className="text-blue-600">
                    {custom.vehicleId?.name || custom.vehicleId}
                  </span>
                </h3>
                <p className="text-gray-600">Stickers: <span className="font-semibold">{custom.stickers?.length || 0}</span></p>
                <p className="text-sm text-gray-400 mt-1">Date: {new Date(custom.createdAt).toLocaleDateString()}</p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setSelectedCustomization(custom)}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <Eye size={18} className="mr-1" />
                    View
                  </button>

                  <button
                    onClick={() => fetchPartners(custom)} // ✅ Pass customization to fetchPartners
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    View Shops
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔍 Customization Modal */}
      {selectedCustomization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl relative">
            <button
              onClick={() => setSelectedCustomization(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Customization Details</h2>
            <p><strong>Vehicle:</strong> {selectedCustomization.vehicleId?.name || selectedCustomization.vehicleId}</p>
            <p><strong>Created At:</strong> {new Date(selectedCustomization.createdAt).toLocaleString()}</p>
            <p><strong>Stickers:</strong></p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {selectedCustomization.stickers.map((sticker, idx) => (
                <li key={idx}>
                  <span className="text-blue-600">Image:</span> {sticker.image},&nbsp;
                  <span className="text-green-600">X:</span> {sticker.x},&nbsp;
                  <span className="text-purple-600">Y:</span> {sticker.y}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 🛍 Partner Shops Modal */}
      {showPartners && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-3xl relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setShowPartners(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Available Shops</h2>
            {partners.length === 0 ? (
              <p className="text-gray-500">No partners found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map((partner) => (
                  <div
                    key={partner._id}
                    className="bg-gray-100 p-4 rounded-lg shadow border"
                  >
                    <p className="text-lg font-bold text-blue-700">{partner.name}</p>
                    <p className="text-sm text-gray-600">Email: {partner.email}</p>
                    <button
                      onClick={() => sendRequestToPartner(partner._id)}
                      disabled={loadingRequest}
                      className={`mt-3 text-white text-sm px-3 py-1 rounded ${loadingRequest ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      {loadingRequest ? 'Sending...' : 'Request'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
