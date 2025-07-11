import React, { useState } from 'react';
import axios from 'axios';

const AddService = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // make sure token is stored on login
    if (!token) {
      alert('Please login first');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      const res = await axios.post(`${API_URL}/service`, data, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

      alert('Service created successfully');
      console.log(res.data);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to create service');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold text-center">Add New Service</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Service Title"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Service Description"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold py-2 rounded-md hover:bg-orange-500 transition"
        >
          Submit Service
        </button>
      </form>
    </div>
  );
};

export default AddService;