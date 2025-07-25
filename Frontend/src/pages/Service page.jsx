// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ServicesSection = () => {
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/service'); // adjust if your route is different
//         setServices(res.data);
//         console.log('Fetched Services:', res.data);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleShowDetails = (service) => {
//     setSelectedService(service);
//   };

//   const handleCloseModal = () => {
//     setSelectedService(null);
//   };

//   return (
//     <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
//       <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//         {services.length > 0 ? (
//           services.map((service) => (
//             <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-100 h-100 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
//               <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//                 {service.description}
//               </p>
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

// export default ServicesSection;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/service');
        setServices(res.data);
        console.log('Fetched Services:', res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleShowDetails = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="bg-gray-50 rounded-xl shadow-md p-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className={`mt-3 text-sm ${service.status === 'Available' ? 'text-green-600' : 'text-black'}`}>
                Title: {service.title}
              </h3>
              <h3 className={`mt-3 text-sm ${service.status === 'Available' ? 'text-green-600' : 'text-black'}`}>
                Description: {service.description}
              </h3>
              {/* ⭐ Show Status */}
              <h3 className={`mt-3 text-smm ${service.status === 'Available' ? 'text-green-600' : 'text-black'}`}>
                Status: {service.status}
              </h3>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-xl text-gray-500">
            No services available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesSection;