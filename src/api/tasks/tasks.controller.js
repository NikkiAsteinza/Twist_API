const Task = require("./tasks.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch {
    res.json("Error recovering tasks", error);
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the document by ID and update its status
    const updatedDocument = await Task.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTasks,
  updateTaskStatus
};
