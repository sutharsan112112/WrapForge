import React, { useState, useEffect } from 'react';


const vehicleData = {
  Bike: [
    { name: 'Pulsar 220f', image: 'https://via.placeholder.com/800x600/FF5733/FFFFFF?text=Pulsar+220f' },
    { name: 'R15 V3', image: 'https://via.placeholder.com/800x600/33FF57/FFFFFF?text=R15+V3' },
    { name: 'MT 15', image: 'https://via.placeholder.com/800x600/3357FF/FFFFFF?text=MT+15' },
  ]
};

const stickers = [
'./src/assets/images/sticker 1.png',
'./src/assets/images/sticker 2.png',
'./src/assets/images/sticker 3.png',
'./src/assets/images/sticker 4.png',
'./src/assets/images/sticker 5.png',
'./src/assets/images/sticker 6.png',
'./src/assets/images/sticker 7.png',

];

function VehiclePage() {
  // `expandedVehicleType` manages which vehicle type's models are shown
  const [expandedVehicleType, setExpandedVehicleType] = useState('Bike');
  const [selectedModel, setSelectedModel] = useState(vehicleData.Bike[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For next/prev navigation

  // Set initial selected model based on the initially expanded vehicle type
  useEffect(() => {
    if (vehicleData[expandedVehicleType] && vehicleData[expandedVehicleType].length > 0) {
      setSelectedModel(vehicleData[expandedVehicleType][0]);
      setCurrentImageIndex(0); // Reset index when vehicle type changes
    }
  }, [expandedVehicleType]);

  const handleSave = () => {
    alert('Vehicle configuration saved!');
    console.log('Saved:', { selectedVehicleType: expandedVehicleType, selectedModel });
  };

  const handleNextImage = () => {
    const currentModels = vehicleData[expandedVehicleType];
    if (currentModels.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentModels.length);
      setSelectedModel(currentModels[(currentImageIndex + 1) % currentModels.length]);
    }
  };

  const handlePrevImage = () => {
    const currentModels = vehicleData[expandedVehicleType];
    if (currentModels.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + currentModels.length) % currentModels.length);
      setSelectedModel(currentModels[(currentImageIndex - 1 + currentModels.length) % currentModels.length]);
    }
  };

  const filteredVehicleTypes = Object.keys(vehicleData).filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-yellow-500 p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase text-center">
          Vehicle
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vehicle..."
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Vehicle Name and Models */}
        <div className="bg-gray-200 p-4 rounded-md shadow-inner mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            VEHICLE NAME AND MODELS
          </h3>
          {filteredVehicleTypes.map((type) => (
            <div key={type} className="mb-4">
              <button
                className={`w-full text-left py-2 px-4 rounded-md flex items-center justify-between transition-colors duration-200
                  ${expandedVehicleType === type ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                onClick={() => {
                  setExpandedVehicleType(type); // Only this type will expand
                  setSelectedModel(vehicleData[type][0]); // Select first model of the newly expanded type
                  setCurrentImageIndex(0); // Reset index for new type
                }}
              >
                <span>{type}</span>
                <span className="text-sm">
                  {expandedVehicleType === type ? (
                    <svg className="w-4 h-4 inline-block ml-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  ) : (
                    <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                </span>
              </button>
              {expandedVehicleType === type && ( // Only show models if this type is expanded
                <div className="mt-2 pl-4">
                  {vehicleData[type].map((model, idx) => (
                    <button
                      key={model.name}
                      className={`w-full text-left py-2 px-4 mt-1 rounded-md transition-colors duration-200
                        ${selectedModel && selectedModel.name === model.name ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => {
                        setSelectedModel(model);
                        setCurrentImageIndex(idx); // Update index when a specific model is clicked
                      }}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex flex-col items-center justify-between relative">
        {/* Save Button (already existed, just confirming its presence) */}
        <button
          className="absolute top-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 z-20"
          onClick={handleSave}
        >
          Save
        </button>

        {/* Vehicle Image/3D Model - Increased size */}
        <div className="relative flex items-center justify-center w-full max-w-5xl h-[500px] mt-16 mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl z-10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          {selectedModel ? (
            <img
              src={selectedModel.image}
              alt={selectedModel.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <p className="text-gray-500 text-xl">Select a vehicle model to view</p>
          )}
          <button
            className="absolute right-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl z-10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleNextImage}
          >
            &gt;
          </button>
        </div>

        {/* Stickers for Modification */}
        <div className="flex-shrink-0 w-full bg-white p-4 rounded-lg shadow-lg flex justify-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {stickers.map((stickerPath, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 h-24 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <img src={stickerPath} alt={`Sticker ${index + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehiclePage;