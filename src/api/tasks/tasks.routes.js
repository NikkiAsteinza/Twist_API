const { getAllTasks } = require("./tasks.controller");
const Task = require("./tasks.model");

const tasksRoutes = require("express").Router();

tasksRoutes.get("/",getAllTasks);


/// Handlebars

tasksRoutes.get("/delete/:id", async (req, res) => {
  const { id } = req.body;
  Task.findOneAndDelete(id)
  .then(()=>{
      console.log("Successful deletion");
      res.render("entities/deleted",  {name:id} );
  }).catch((err) => next(err));
});

tasksRoutes.get("/switch/:id", async (req, res) => {
  const { id } = req.body;
  let taskStatus = false;
  Task.findById(id)
  .then((task)=>{
    taskStatus = task.status;
    console.log(taskStatus);
    const targetStatus =  !taskStatus;
    console.log(targetStatus);
    Task.findByIdAndUpdate(
      { _id: id }, // Filter
      { $set: { status: targetStatus } }, // Update
      { upsert: false } // add document with req.body._id if not exists
    )
      .then((task) => {
        console.log(task);
        task.status = targetStatus;
        res.render("entity/switcher",  {task:task} );
      })
      .catch((err) => next(err));
  })
});

tasksRoutes.get("/list", async (req, res) => {
  const tasks = await Task.find();

  res.render("tasks", { tasks });
});

module.exports = tasksRoutes;