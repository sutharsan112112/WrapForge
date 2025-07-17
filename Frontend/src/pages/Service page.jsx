// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ServicePage = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`);
//         setServices(res.data); // assuming array of service objects
//       } catch (err) {
//         console.error('Fetch error:', err);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
//       <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {services.length > 0 ? (
//           services.map((service) => (
//             <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
//               <img
//                 src={service.image} // must be full Cloudinary or server URL
//                 alt={service.title}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-semibold">{service.name}</h3>
//               <p className="text-gray-600 text-sm mt-2">{service.design}</p>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 text-center text-xl text-gray-500">
//             No services available yet.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServicePage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`);
        setServices(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchServices();
  }, []);

  const handleShowDetails = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowModal(false);
  };

  return (
    <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{service.design}</p>
              <button
                onClick={() => handleShowDetails(service)}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-xl text-gray-500">
            No services available yet.
          </div>
        )}
      </div>

      {/* Modal Popup */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4">
          <div className="bg-white h-[60vh] rounded-xl max-w-xl w-full relative shadow-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedService.image}
              alt={selectedService.name}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedService.name}</h2>
            <p className="text-gray-700">{selectedService.design}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;