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
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : ''; // Full URL

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const service = new Service({
      title,
      description,
      image, // Use the full URL for the image
      createdBy: req.user._id, // Assuming user is authenticated
    });

    await service.save(); // Save the service to DB
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    console.error('Error during service creation:', err);
    res.status(500).json({ message: 'Failed to create service', error: err.message });
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
