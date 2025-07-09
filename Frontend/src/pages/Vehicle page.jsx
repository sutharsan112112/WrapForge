// import React, { useState, useEffect } from 'react';
// import '@google/model-viewer';


// function VehiclePage() {
//   const [vehicleData, setVehicleData] = useState({ Bike: [] });
//   const [expandedVehicleType, setExpandedVehicleType] = useState('Bike');
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [newVehicle, setNewVehicle] = useState({ name: '', model: '', year: '', file: null });

//   const stickers = [
//     './src/assets/images/sticker 1.png',
//     './src/assets/images/sticker 2.png',
//     './src/assets/images/sticker 3.png',
//     './src/assets/images/sticker 4.png',
//     './src/assets/images/sticker 5.png',
//     './src/assets/images/sticker 6.png',
//     './src/assets/images/sticker 7.png',
//   ];

//   useEffect(() => {
//     fetch('http://localhost:5000/api/vehicle')
//       .then((res) => res.json())
//       .then((data) => {
//         setVehicleData({ Bike: data });
//         if (data.length > 0) {
//           setSelectedModel(data[0]);
//           setCurrentImageIndex(0);
//         }
//       });
//   }, []);

//   const handleSave = () => {
//     alert('Vehicle configuration saved!');
//     console.log('Saved:', { selectedVehicleType: expandedVehicleType, selectedModel });
//   };

//   const handleNextImage = () => {
//     const models = vehicleData[expandedVehicleType];
//     const nextIndex = (currentImageIndex + 1) % models.length;
//     setCurrentImageIndex(nextIndex);
//     setSelectedModel(models[nextIndex]);
//   };

//   const handlePrevImage = () => {
//     const models = vehicleData[expandedVehicleType];
//     const prevIndex = (currentImageIndex - 1 + models.length) % models.length;
//     setCurrentImageIndex(prevIndex);
//     setSelectedModel(models[prevIndex]);
//   };

//   const filteredVehicleTypes = Object.keys(vehicleData).filter(type =>
//     type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', newVehicle.name);
//     formData.append('model', newVehicle.model);
//     formData.append('year', newVehicle.year);
//     formData.append('image', newVehicle.file);

//     try {
//       const res = await fetch('http://localhost:5000/api/vehicle', {
//         method: 'POST',
//         body: formData
//       });
//       const data = await res.json();
//       alert('Vehicle uploaded successfully!');
//       const updatedData = [...vehicleData.Bike, data];
//       setVehicleData({ Bike: updatedData });
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans">
//       <div className="w-80 bg-yellow-500 p-6 shadow-lg">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase text-center">
//           Vehicle
//         </h2>

//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search vehicle..."
//             className="w-full p-3 rounded-md border border-gray-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="mb-6 bg-white p-4 rounded shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Add New Vehicle</h3>
//           <form onSubmit={handleUpload}>
//             <input type="text" placeholder="Name" className="mb-2 p-2 w-full border rounded" onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })} required />
//             <input type="text" placeholder="Model" className="mb-2 p-2 w-full border rounded" onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} required />
//             <input type="number" placeholder="Year" className="mb-2 p-2 w-full border rounded" onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })} required />
//             <input type="file" accept=".jpg,.jpeg,.png,.glb" className="mb-2 p-2 w-full border rounded" onChange={(e) => setNewVehicle({ ...newVehicle, file: e.target.files[0] })} required />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Upload</button>
//           </form>
//         </div>

//         <div className="bg-gray-200 p-4 rounded-md shadow-inner mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">VEHICLE NAME AND MODELS</h3>
//           {filteredVehicleTypes.map((type) => (
//             <div key={type} className="mb-4">
//               <button
//                 className={`w-full text-left py-2 px-4 rounded-md ${expandedVehicleType === type ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
//                 onClick={() => {
//                   setExpandedVehicleType(type);
//                   setSelectedModel(vehicleData[type][0]);
//                   setCurrentImageIndex(0);
//                 }}
//               >
//                 {type}
//               </button>
//               {expandedVehicleType === type && (
//                 <div className="mt-2 pl-4">
//                   {vehicleData[type].map((model, idx) => (
//                     <button
//                       key={model.name + idx}
//                       className={`w-full text-left py-2 px-4 mt-1 rounded-md ${selectedModel?.name === model.name ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                       onClick={() => {
//                         setSelectedModel(model);
//                         setCurrentImageIndex(idx);
//                       }}
//                     >
//                       {model.name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 p-6 flex flex-col items-center justify-between relative">
//         <button
//           className="absolute top-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
//           onClick={handleSave}
//         >
//           Save
//         </button>

//         <div className="relative flex items-center justify-center w-full max-w-10xl h-[685px] mt-16 mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
//           <button
//             className="absolute left-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl"
//             onClick={handlePrevImage}
//           >
//             &lt;
//           </button>

//           {/* {selectedModel ? (
//             <img
//               src={`http://localhost:5000${selectedModel.image}`}
//               alt={selectedModel.name}
//               className="max-w-full max-h-full object-contain"
//             />
//           ) : (
//             <p className="text-gray-500 text-xl">Select a vehicle model to view</p>
//           )} */}

        
//           {/* select model */}
//           {selectedModel ? (
//   selectedModel?.image && selectedModel.image.endsWith('.glb') ? (
//     <model-viewer
//       src={`http://localhost:5000${selectedModel.image}`}
//       alt={selectedModel.name}
//       autTheeleepanao-rotate
//       camera-controls
//       style={{ width: '100%', height: '100%' }}
//       background-color="#FFFFFF"
//     ></model-viewer>
//   ) : (
//     <img
//       src={`http://localhost:5000${selectedModel.image}`}
//       alt={selectedModel.name}
//       className="max-w-full max-h-full object-contain"
//     />
//   )
// ) : (
//   <p className="text-gray-500 text-xl">Select a vehicle model to view</p>
// )}
// {/* end  */}

//           <button
//             className="absolute right-4 p-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-2xl"
//             onClick={handleNextImage}
//           >
//             &gt;
//           </button>
//         </div>

//         <div className="flex-shrink-0 w-full bg-white p-4 rounded-lg shadow-lg flex justify-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
//           {stickers.map((stickerPath, index) => (
//             <div key={index} className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
//               <img src={stickerPath} alt={`Sticker ${index + 1}`} className="w-full h-full object-contain" />
//             </div>
//           ))}
//         </div>

//         <AddVehicle onUpload={(data) => {
//             const updated = [...vehicleData.Bike, data];
//             setVehicleData({ Bike: updated });
//         }} />
//       </div>
//     </div>
//   );
// }

// export default VehiclePage;

import React, { useState, useEffect } from 'react';
import '@google/model-viewer';

function VehiclePage() {
  const [vehicleData, setVehicleData] = useState({ Bike: [] });
  const [expandedVehicleType, setExpandedVehicleType] = useState('Bike');
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/vehicle')
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
                    <button
                      key={model.name + idx}
                      className={`w-full text-left py-2 px-4 mt-1 rounded-md ${selectedModel?.name === model.name ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => {
                        setSelectedModel(model);
                        setCurrentImageIndex(idx);
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
                src={`http://localhost:5000${selectedModel.image}`}
                alt={selectedModel.name}
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '100%' }}
                background-color="#FFFFFF"
              ></model-viewer>
            ) : (
              <img
                src={`http://localhost:5000${selectedModel.image}`}
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