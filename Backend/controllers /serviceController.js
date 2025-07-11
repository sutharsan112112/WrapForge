import Service from '../models/Service.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path || ''; // Multer adds `file`

    const service = new Service({
      title,
      description,
      image,
      createdBy: req.user._id
    });

    await service.save();
    res.status(201).json({ message: 'Service created', service });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service' });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;

    const update = { title, description };
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
