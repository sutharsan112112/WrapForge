import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddService = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [serviceData, setServiceData] = useState({
    name: '',
    design: '',
    file: null,
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      const file = files[0];
      setServiceData((prev) => ({ ...prev, file }));

      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setServiceData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceData.file) {
      alert('Please select an image file.');
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('❌ Please log in to upload a service.');
      return;
    }

    const formData = new FormData();
    formData.append('name', serviceData.name);
    formData.append('design', serviceData.design);
    formData.append('image', serviceData.file); // 'image' key must match backend

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/service`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert('✅ Service uploaded successfully!');
        setServiceData({ name: '', design: '', file: null });
        setPreviewUrl(null);

        // Redirect to the Service Page
        navigate('/services'); // Navigate to the service page after success
      } else {
        throw new Error('Service upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.response?.data?.message || '❌ Upload failed. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10 text-gray-800 mt-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Add New Service</h1>
        <p className="text-sm text-gray-500 mt-1">Upload custom service/image with details</p>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border">
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Service Name */}
          <div>
            <label className="text-sm font-medium" htmlFor="name">Service Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={serviceData.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="service name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium" htmlFor="design">Description</label>
            <input
              type="text"
              id="design"
              name="design"
              value={serviceData.design}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Ex: bike head light"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium" htmlFor="file">Upload Image (jpg/png)</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="flex justify-center mt-3">
              <img
                src={previewUrl}
                alt="Service preview"
                className="h-40 border rounded-md object-contain shadow"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-500 text-black rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-orange-500"
          >
            <PlusCircle className="w-5 h-5" /> Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;