import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Add this at the top
import '@google/model-viewer';

function VehiclePage() {
  const [vehicleData, setVehicleData] = useState({ Bike: [] });
  const [expandedVehicleType, setExpandedVehicleType] = useState('Bike');
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/vehicles')
      .then((res) => res.json())
      .then((data) => {
        setVehicleData({ Bike: data });
        if (data.length > 0) {
          setSelectedModel(data[0]);
          setCurrentImageIndex(0);
        }
      });
  }, []);

  const handleSave = () => {
    alert('Vehicle configuration saved!');
    console.log('Saved:', { selectedVehicleType: expandedVehicleType, selectedModel });
  };

  const handleNextImage = () => {
    const models = vehicleData[expandedVehicleType];
    const nextIndex = (currentImageIndex + 1) % models.length;
    setCurrentImageIndex(nextIndex);
    setSelectedModel(models[nextIndex]);
  };

  const handlePrevImage = () => {
    const models = vehicleData[expandedVehicleType];
    const prevIndex = (currentImageIndex - 1 + models.length) % models.length;
    setCurrentImageIndex(prevIndex);
    setSelectedModel(models[prevIndex]);
  };

  const filteredVehicleTypes = Object.keys(vehicleData).filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="w-80 bg-yellow-500 p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase text-center">
          Vehicle
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vehicle..."
            className="w-full p-3 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-gray-200 p-4 rounded-md shadow-inner mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">VEHICLE NAME AND MODELS</h3>
          {filteredVehicleTypes.map((type) => (
            <div key={type} className="mb-4">
              <button
                className={`w-full text-left py-2 px-4 rounded-md ${expandedVehicleType === type ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                onClick={() => {
                  setExpandedVehicleType(type);
                  setSelectedModel(vehicleData[type][0]);
                  setCurrentImageIndex(0);
                }}
              >
                {type}
              </button>
              {expandedVehicleType === type && (
                <div className="mt-2 pl-4">
                  {vehicleData[type].map((model, idx) => (
                    <div key={model.name + idx} className="mb-2">
                      <button
                        className={`w-full text-left py-2 px-4 rounded-md ${selectedModel?.name === model.name ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => {
                          setSelectedModel(model);
                          setCurrentImageIndex(idx);
                        }}
                      >
                        {model.name}
                      </button>

                      <button
                        onClick={() => navigate(`/customize/${model._id}`)}
                        className="mt-1 ml-2 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Customize
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-between relative">
        <button
          className="absolute top-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={handleSave}
        >
          Save
        </button>

        <div className="relative flex items-center justify-center w-full max-w-10xl h-[685px] mt-16 mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <button
            className="absolute left-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl"
            onClick={handlePrevImage}
          >
            &lt;
          </button>

          {selectedModel ? (
            selectedModel?.image && selectedModel.image.endsWith('.glb') ? (
              <model-viewer
                src={selectedModel.image.startsWith('http') ? selectedModel.image : `http://localhost:5000${selectedModel.image}`}
                alt={selectedModel.name}
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '100%' }}
                background-color="#FFFFFF"
              ></model-viewer>
            ) : (
              <img
                src={selectedModel.image.startsWith('http') ? selectedModel.image : `http://localhost:5000${selectedModel.image}`}
                alt={selectedModel.name}
                className="max-w-full max-h-full object-contain"
              />
            )
          ) : (
            <p className="text-gray-500 text-xl">Select a vehicle model to view</p>
          )}

          <button
            className="absolute right-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl"
            onClick={handleNextImage}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehiclePage;