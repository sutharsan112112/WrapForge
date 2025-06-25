import React, { useState } from 'react';

const images = [
  { src: '../src/assets/images/t 1.png', title: 'Honda Click Demon Eye', description: 'Stylish demon eye modification for Honda Click.' },
  { src: '../src/assets/images/t 2.png', title: '22mm Grips Cove', description: 'Comfortable 22mm handle grips for better control.' },
  { src: '../src/assets/images/t 3.png', title: 'Pulsar Full Body Kit', description: 'Complete body kit for Bajaj Pulsar bikes.' },
  { src: '../src/assets/images/t 4.png', title: 'Absorber Suspension Spring', description: 'Heavy-duty absorber for smooth rides.' },
  { src: '../src/assets/images/t 5.png', title: 'Bajaj Pulsar Half Silencer', description: 'Bright and stylish headlight for Pulsar220.' },
  { src: '../src/assets/images/t 6.jpg', title: 'YAMAHA R15 Engine retailers Racing Parts', description: 'Modified half silencer for better sound and look.' }

];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 w-6xl h-6xl">
        {images.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm" >
            <img src={item.src} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <button onClick={() => openModal(item)} className="bg-yellow-500 hover:bg-orange-500 text-white px-4 py-2 rounded">Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-cover rounded" />
            <h2 className="text-xl font-bold mt-4">{selectedImage.title}</h2>
            <p className="text-gray-700 mt-2">{selectedImage.description}</p>
            <button onClick={closeModal} className="mt-4 bg-yellow-500 hover:bg-orange-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;