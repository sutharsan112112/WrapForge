import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.warn('No auth token found.');
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error('Expected array but got:', res.data);
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
    // Optional: Navigate to edit page or open modal
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b text-gray-600 text-sm font-semibold uppercase">
          <span>User</span>
          <span>Contact</span>
          <span>Registered</span>
          <span className="text-right">Actions</span>
        </div>

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-4 gap-4 items-center px-4 py-3 border-b hover:bg-gray-50 transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username || 'username'}</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p>{user.email}</p>
              <p className="text-sm text-gray-500">{user.contactNumber || '—'}</p>
            </div>

            {/* Registered */}
            <div>{new Date(user.createdAt).toLocaleDateString()}</div>

            {/* Actions */}
            <div className="text-right space-x-4 text-sm">
              <button
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:underline font-semibold"
              >
                <FaEdit className="inline mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:underline font-semibold"
              >
                <FaTrashAlt className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Usermanagement;
