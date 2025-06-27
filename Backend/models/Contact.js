
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // senderRole: {
    //     type: String,
    //     enum: ['user', 'partner', 'admin'],
    //     required: true
    // },
    message: { type: String, required: true },
    reply: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;