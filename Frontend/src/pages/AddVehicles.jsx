import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import '@google/model-viewer';

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({ Bike: [] });
  const [expandedVehicleType, setExpandedVehicleType] = useState('Bike');
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for new vehicle form inputs
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    file: null,
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/vehicle')
      .then((res) => res.json())
      .then((data) => {
        setVehicleData({ Bike: data });
        if (data.length > 0) {
          setSelectedModel(data[0]);
          setCurrentImageIndex(0);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleSave = () => {
    alert('Vehicle configuration saved!');
    console.log('Saved:', { selectedVehicleType: expandedVehicleType, selectedModel });
  };

  const handleNextImage = () => {
    const models = vehicleData[expandedVehicleType];
    if (!models || models.length === 0) return;

    const nextIndex = (currentImageIndex + 1) % models.length;
    setCurrentImageIndex(nextIndex);
    setSelectedModel(models[nextIndex]);
  };

  const handlePrevImage = () => {
    const models = vehicleData[expandedVehicleType];
    if (!models || models.length === 0) return;

    const prevIndex = (currentImageIndex - 1 + models.length) % models.length;
    setCurrentImageIndex(prevIndex);
    setSelectedModel(models[prevIndex]);
  };

  const filteredVehicleTypes = Object.keys(vehicleData).filter((type) =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes for the form (including file)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNewVehicle((prev) => ({ ...prev, file: files[0] }));
    } else {
      setNewVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler to upload new vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newVehicle.file) {
      alert('Please select a vehicle file.');
      return;
    }

    const formData = new FormData();
    formData.append('make', newVehicle.make);
    formData.append('model', newVehicle.model);
    formData.append('year', newVehicle.year);
    formData.append('image', newVehicle.file);

    try {
      const res = await fetch('http://localhost:5000/api/vehicle', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to upload vehicle');
      }
      const data = await res.json();
      alert('Vehicle uploaded successfully!');

      // Update state with new vehicle
      const updatedData = [...vehicleData.Bike, data];
      setVehicleData({ Bike: updatedData });

      // Reset form
      setNewVehicle({ make: '', model: '', year: '', file: null });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10 text-gray-800 mt-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Add New Vehicle</h1>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span role="img" aria-label="car">
              🚗
            </span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center mb-1">Add New Vehicle</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Register your vehicle information in the system</p>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="make">
                Name *
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={newVehicle.make}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                placeholder="Toyota"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="model">
                Model *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={newVehicle.model}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                placeholder="Camry"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="year">
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={newVehicle.year}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                placeholder="2023"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="file">
                Vehicle File (Image or .glb) *
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg,.jpeg,.png,.glb"
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-orange-500"
          >
            <PlusCircle className="w-5 h-5" /> Upload Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;