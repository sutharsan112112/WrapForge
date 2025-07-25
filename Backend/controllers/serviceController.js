import Service from '../models/Service.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ status: 'Pending' }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { title, description, status } = req.body; // Include status
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

    const service = new Service({
      title,
      description,
      image,
      status: status || 'Pending', // default to active if not provided
      createdBy: req.user._id,
    });

    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    const update = { title, description };
    if (status) update.status = status;
    if (image) update.image = image;

    const service = await Service.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service updated', service });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
