import Request from '../models/Request.js';
import User from '../models/User.js';
import Customization from '../models/Customization.js';

export const createRequest = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User from token:", req.user);

    const userId = req.user.id; // ✅ Corrected from _id to id
    const { partnerId, customizationId } = req.body;

    if (!partnerId || !customizationId) {
      return res.status(400).json({ message: 'partnerId and customizationId are required' });
    }

    const newRequest = new Request({
      userId,
      partnerId,
      customizationId,
      status: 'pending',
    });

    await newRequest.save();

    res.status(201).json({ message: 'Request sent successfully', request: newRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Server error while creating request' });
  }
};

export const getRequestsForPartner = async (req, res) => {
  try {
    const partnerId = req.user._id; // still valid if _id is set in partner login

    const requests = await Request.find({ partnerId })
      .populate('userId', 'name email')
      .populate({
        path: 'customizationId',
        populate: {
          path: 'vehicleId',
          select: 'name'
        }
      })
      .exec();

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests for partner:', error);
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
};
