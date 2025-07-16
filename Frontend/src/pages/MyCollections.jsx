import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCollection = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Fetch saved designs
  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/collection/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDesigns(res.data);
    } catch (err) {
      console.error('Failed to fetch designs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Simulate selected vehicle model from VehiclePage via localStorage
  useEffect(() => {
    const vehicleStr = localStorage.getItem('selected_vehicle');
    if (vehicleStr) {
      const vehicle = JSON.parse(vehicleStr);
      setSelectedVehicle(vehicle);
      setTitle(vehicle.name || '');
    }
  }, []);

  const handleSaveDesign = async () => {
    if (!selectedVehicle) return alert('No vehicle selected.');
    if (!title) return alert('Title is required.');

    setSaving(true);
    try {
      const token = localStorage.getItem('auth_token');
      const payload = {
        title,
        description,
        image: selectedVehicle.image, // Assuming already uploaded via VehiclePage
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/collection`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Design saved!');
      setTitle('');
      setDescription('');
      setSelectedVehicle(null);
      localStorage.removeItem('selected_vehicle');
      fetchDesigns();
    } catch (err) {
      console.error('Failed to save design:', err);
      alert('Error saving design.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/collection/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDesigns();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 mt-20">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>
      <h2 className="text-3xl font-bold text-yellow-600 mb-6">My Collection</h2>

      {/* Show selected vehicle if exists */}
      {selectedVehicle && (
        <div className="bg-white rounded shadow p-6 mb-8 max-w-xl">
          <h3 className="text-xl font-semibold mb-4">Save Current Design</h3>
          <img
            src={`http://localhost:5000${selectedVehicle.image}`}
            alt="Selected Design"
            className="w-full h-60 object-contain rounded mb-4 border"
          />
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            placeholder="Design title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleSaveDesign}
            disabled={saving}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            {saving ? 'Saving...' : 'Save Design'}
          </button>
        </div>
      )}

      {/* Saved Gallery */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">Loading designs...</p>
        ) : designs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No designs found.</p>
        ) : (
          designs.map((design) => (
            <div key={design._id} className="bg-white rounded shadow p-4 relative">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold">{design.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{design.description}</p>
              <button
                onClick={() => handleDelete(design._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                aria-label="Delete Design"
              >
                <Trash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCollection;