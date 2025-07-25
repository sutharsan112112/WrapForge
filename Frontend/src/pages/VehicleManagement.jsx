import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchVehicles();
  }, []);

  const is3DModel = (url) => {
    return url.endsWith('.glb') || url.endsWith('.gltf');
  };

  return (
    <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">All Vehicles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-gray-50 rounded-xl shadow-md p-4">
              {is3DModel(vehicle.image) ? (
                <model-viewer
                  src={vehicle.image}
                  alt={vehicle.name}
                  auto-rotate
                  camera-controls={false}
                  autoplay
                  disable-pan
                  disable-tap
                  shadow-intensity="1"
                  environment-image="neutral"
                  style={{ width: '100%' }}
                  min-camera-orbit="auto auto 2m"
                  max-camera-orbit="auto auto 10m"
                />
              ) : (
                <img
                  src={vehicle.image || 'default-image-url'}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{vehicle.name}</h3>
              <p className="text-gray-600 text-sm mt-1">Model: {vehicle.model}</p>
              <p className="text-gray-600 text-sm mt-1">Year: {vehicle.year}</p>
              <p className="text-gray-600 text-sm mt-1">Status: {vehicle.status || 'Unknown'}</p>
              <p className="text-gray-600 text-sm mt-1">
                Date: {vehicle.date ? new Date(vehicle.date).toLocaleDateString() : 'N/A'}
              </p>
              {vehicle.size && (
                <p className="text-gray-600 text-sm mt-1">Size: {vehicle.size}</p>
              )}

            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-xl text-gray-500">
            No vehicles available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesManagement;