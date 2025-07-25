import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchServices();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  const handleSelect = (serviceId) => {
    setSelectedServiceId(serviceId === selectedServiceId ? null : serviceId);
  };

  const handleAvailabilityChange = (serviceId, status) => {
    // ✅ If you want to call backend here, you can add axios.put(...)
    const updated = services.map((s) =>
      s._id === serviceId ? { ...s, status } : s
    );
    setServices(updated);
    setSelectedServiceId(null); // close option buttons
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

      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">All Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
              <img
                src={service.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={service.serviceType}
              />
              <h3 className="text-lg font-semibold">{service.serviceType}</h3>
              <h3 className={`mt-3 text-sm ${service.status === 'Available' ? 'text-green-600' : 'text-black'}`}>
                Title: {service.title}
              </h3>
              <h3 className={`mt-3 text-sm ${service.status === 'Available' ? 'text-green-600' : 'text-black'}`}>
                Description: {service.description}
              </h3>
              <p className="text-gray-600 text-sm mt-1">Status: {service.status || 'Pending'}</p>
              {/* Action Buttons */}
              <div className="px-5 py-5 mt-4 flex gap-x-3 flex-wrap">
                <button
                  className={`px-3 py-1 rounded-md text-sm text-white ${service.status === 'Available'
                      ? 'bg-green-600'
                      : 'bg-green-500 hover:bg-green-600'
                    }`}
                  onClick={() => handleAvailabilityChange(service._id, 'Available')}
                >
                  Available
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm text-white ${service.status === 'Unavailable'
                      ? 'bg-yellow-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  onClick={() => handleAvailabilityChange(service._id, 'Unavailable')}
                >
                  Unavailable
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm"
                  onClick={() => alert(`Delete service: ${service._id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-xl text-gray-500">
            No services available yet.
          </div>
        )}
      </div>
    </div >
  );
};

export default ServiceManagement;