import Contact from "../models/Contact.js";

// Send a message from user or partner
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const newMsg = await Contact.create({
            senderId: req.user.id,
            message
        });
        res.status(201).json({ message: 'Message sent successfully', data: newMsg });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};

// Get all messages for admin
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().populate('senderId', 'email role');
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve messages', error: error.message });
    }
};

// Reply to a message from user or partner
export const replyToMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;

        const message = await Contact.findById(id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        message.reply = reply;
        await message.save();

        res.json({ message: 'Replied successfully', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Reply failed', error: error.message });
    }
};

// Update contact message (PUT)
export const updateContactMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (contact.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to edit this message" });
    }

    contact.message = message;
    await contact.save();

    res.status(200).json({ message: "Message updated successfully", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};