const Task = require("./tasks.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch {
    res.json("Error recovering tasks", error);
  }
};

module.exports = {
  getAllTasks,
};
