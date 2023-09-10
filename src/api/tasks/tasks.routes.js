const { getAllTasks } = require("./tasks.controller");
const Task = require("./tasks.model");

const tasksRoutes = require("express").Router();

tasksRoutes.get("/",getAllTasks);


/// Handlebars

tasksRoutes.get("/list", async (req, res) => {
  const Tasks = await Task.find();

  res.render("Tasks", { Tasks });
});

tasksRoutes.get("/create", async (req, res) => {  
  res.render("form/task");
});

tasksRoutes.post("/create/sent", async (req, res, next) => {
  Task.create(req.body)
      .then((newTask) => {
        console.log(newTask)
        res.render("entities/operationResult", {
          title : "Creating task",
          icon: "check",
          message: "Task created succesfully",
          goBackLink:"../list"});
      })
      .catch(err => {
          if (err) {
              console.log(err)
              res.render("entities/operationResult", { 
                  title : "Creating task",
                  icon: "trash",
                  message: "Error while creating task",
                  goBackLink:"../list"});
          } else {
              console.log(err)
              next(err)
          }
      })
  
});

tasksRoutes.get("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Task.findById(id)
  .then((task)=>{
      console.log("task found "+task);
      res.render("form/task", { task });
  })
  .catch((err) => next(err));
});

tasksRoutes.post("/edit/:id/sent", async (req, res, next) => {
  const { id } = req.params;
  const filter = { _id: id };
  // Load the document
  const doc = await Task.findOne(filter);

  // Update the document using `Document#updateOne()`

await doc.updateOne(req.body).then((newTask) => {
        console.log(newTask)
        res.render("entities/operationResult", {
          title : "Editting task",
          icon: "check",
          message: "Task edited succesfully",
          goBackLink:"../list"});
      })
      .catch(err => {
          if (err) {
              console.log(err)
              res.render("entities/operationResult", { 
                  title : "Editting task",
                  icon: "trash",
                  message: "Error while editting task",
                  goBackLink:"../list"});
          } else {
              console.log(err)
              next(err)
          }
      })
  
});


tasksRoutes.get("/delete/:id", async (req, res, next) => {
      const { id } = req.body;
      Task.findOneAndDelete(id)
      .then((newTask) => {
        console.log(newTask)
        res.render("entities/operationResult", { 
          title : "Deleting task",
          icon: "trash",
          message: "Task deleted succesfully",
          goBackLink:"../list"});
      })
      .catch(err => {
          if (err) {
              console.log(err)
              res.render("entities/operationResult", {
                  title : "Deleting task",
                  icon: "trash",
                  message: "Error while deleting task",
                  goBackLink:"../list"});
          } else {
              console.log(err)
              next(err)
          }
      })
  
});

module.exports = tasksRoutes;