import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '/src/assets/images/WrapForge logo.png';

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error('Gallery fetch failed', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3fb] px-6 py-8">
      <div className="text-center mb-8">
        <img src={logo} alt="WrapForge Logo" className="mx-auto w-20" />
        <h2 className="mt-3 text-3xl font-bold text-[#2f1c13]">Gallery</h2>
        <p className="text-gray-600 mt-1">Explore our latest wraps</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 bg-white">
            <img src={item.imageUrl} alt={`Gallery ${index}`} className="w-full h-64 object-cover" />
            {item.caption && <p className="text-center py-2 text-sm text-gray-700">{item.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;