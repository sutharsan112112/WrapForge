import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`);
        setServices(res.data); // assuming array of service objects
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
            <img
              src={service.image} // must be full Cloudinary or server URL
              alt={service.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;