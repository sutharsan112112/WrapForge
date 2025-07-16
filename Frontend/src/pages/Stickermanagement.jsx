import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StickerManagement = () => {
  const [stickers, setStickers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStickers(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchStickers();
  }, []);

  return (
    <div className="py-16 px-4 bg-white mx-4 md:mx-20 my-10 rounded-xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">All Stickers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stickers.map((sticker) => (
          <div key={sticker._id} className="bg-gray-50 rounded-xl shadow-md p-4">
            <img
              src={`${import.meta.env.VITE_API_URL}/${sticker.image}`}
              alt={sticker.name}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{sticker.name}</h3>
            <p className="text-gray-600 text-sm mt-2">Type: {sticker.design}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerManagement;