const Puzzle = require("../api/puzzles/puzzles.model");
const Task = require("../api/tasks/tasks.model");

const HandlebarsRoutes = require("express").Router();

//Render route
HandlebarsRoutes.get("/", (req, res) => {
    res.render("index", { titulo: "Bienvenidx a la Twist API :)" });
  });
  HandlebarsRoutes.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
  
    res.render("tasks", { tasks });
  });
  HandlebarsRoutes.get("/list", async (req, res) => {
    const puzzles = await Puzzle.find();
  
    res.render("puzzles", { puzzles });
  });
  HandlebarsRoutes.get("/task/:id/witch", async (req, res) => {
    const { id } = req.params;
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
          res.render("tasks/switcher",  {task:task} );
        })
        .catch((err) => next(err));
    })
  });
module.exports = HandlebarsRoutes;