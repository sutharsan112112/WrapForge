import React, { useEffect, useState } from 'react';
import { Send, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // example: http://localhost:5000/api

  const fetchMessages = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not logged in.');
      setLoading(false);
      return;
    }

    // ✅ Axios GET request with headers
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Axios-ல் response data directly res.data-ல் இருக்கும்
    if (Array.isArray(res.data.messages)) {
      setMessages(res.data.messages);
    } else {
      toast.warning('Unexpected response format.');
      setMessages([]);
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    toast.error(err.response?.data?.message || 'Failed to fetch messages.');
    setMessages([]);
  } finally {
    setLoading(false);
  }
};


  const handleReply = async (id) => {
  const reply = replyText[id];

  if (!reply || reply.trim() === "") {
    toast.warn("Please type a reply.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/contact/reply/${id}`,
      { reply },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data?.message || "Reply sent successfully!");
    setReplyText((prev) => ({ ...prev, [id]: "" }));
    fetchMessages();
  } catch (err) {
    console.error("Reply failed:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Error while sending reply.");
  }
};



  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this message?')) return;

  try {
    const token = localStorage.getItem('token');

    // ✅ Axios DELETE request
    await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success('Message deleted');
    fetchMessages(); // Refresh messages after delete
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Error while deleting message.');
  }
};

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 mt-20 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center bg-yellow-400 hover:bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Messages</h2>

      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No contact messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white shadow-md rounded-md p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>From:</strong> {msg.senderId?.name || 'Unknown User'}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Message:</strong> {msg.message}
                  </p>
                  {msg.reply ? (
                    <p className="text-green-600">
                      <strong>Reply:</strong> {msg.reply}
                    </p>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Type reply..."
                        value={replyText[msg._id] || ''}
                        onChange={(e) =>
                          setReplyText({ ...replyText, [msg._id]: e.target.value })
                        }
                        className="px-3 py-1 border rounded-md w-full sm:w-64"
                      />
                      <button
                        onClick={() => handleReply(msg._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md flex items-center gap-1"
                      >
                        <Send size={16} /> Reply
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessage;
