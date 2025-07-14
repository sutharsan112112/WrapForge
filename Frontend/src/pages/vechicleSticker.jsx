import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@google/model-viewer';

const VehicleStickerViewer = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [appliedStickers, setAppliedStickers] = useState([]);
  const navigate = useNavigate();

  // Fetch vehicle by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicle/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const path = data.image.startsWith('/uploads')
          ? `http://localhost:5000${data.image}`
          : data.image;
        setVehicle(path);
      });
  }, [id]);

  // Fetch all stickers
  useEffect(() => {
    fetch('http://localhost:5000/api/sticker')
      .then((res) => res.json())
      .then((data) => {
            console.log("STICKER DATA:", data); // ⬅️ check this
      setStickers(data);
    });

  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const stickerSrc = e.dataTransfer.getData('sticker');

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setAppliedStickers((prev) => [...prev, { src: stickerSrc, x, y }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sticker Customization</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Vehicle List
        </button>
      </div>

      <div
        className="relative w-full max-w-5xl h-[600px] mx-auto border bg-white rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {vehicle ? (
          vehicle.endsWith('.glb') ? (
            <model-viewer
              src={vehicle}
              auto-rotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
              background-color="#fff"
            ></model-viewer>
          ) : (
            <img
              src={vehicle}
              alt="Vehicle"
              className="w-full h-full object-contain"
            />
          )
        ) : (
          <p className="text-center text-gray-600 mt-32 text-xl">Loading vehicle...</p>
        )}

        {/* Render placed stickers */}
        {appliedStickers.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={`Sticker ${i}`}
            className="absolute w-24 h-24 object-contain pointer-events-none"
            style={{ top: `${s.y}px`, left: `${s.x}px` }}
          />
        ))}
      </div>

      {/* Sticker Selection */}
      <div className="mt-6 flex justify-center flex-wrap gap-4">
        {stickers.map((sticker, idx) => (
//           <img
//             key={idx}
// src={sticker.imageUrl.startsWith('http') ? sticker.imageUrl : `http://localhost:5000${sticker.imageUrl}`}
//             alt={sticker.name}
//             draggable
//             onDragStart={(e) =>
// e.dataTransfer.setData(
//   'sticker',
//   sticker.imageUrl.startsWith('http') ? sticker.imageUrl : `http://localhost:5000${sticker.imageUrl}`
// )

//             }
//             className="w-20 h-20 object-contain border rounded shadow cursor-move bg-white"
//           />
<img
  key={idx}
  src={
    sticker.imageUrl.startsWith('http')
      ? sticker.imageUrl
      : `http://localhost:5000${sticker.imageUrl}`
  }
  alt={sticker.name}
  draggable
  onDragStart={(e) =>
    e.dataTransfer.setData(
      'sticker',
      sticker.imageUrl.startsWith('http')
        ? sticker.imageUrl
        : `http://localhost:5000${sticker.imageUrl}`
    )
  }
  onError={(e) => {
    e.target.src = '/fallback.png'; // fallback if broken
  }}
  className="w-20 h-20 object-contain border rounded shadow cursor-move bg-white"
/>

        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setAppliedStickers([])}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Clear Stickers
        </button>
      </div>
    </div>
  );
};

export default VehicleStickerViewer;
