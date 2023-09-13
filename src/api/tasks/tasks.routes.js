const { getAllTasks } = require("./tasks.controller");
const Tasks = require("./tasks.model");

const tasksRoutes = require("express").Router();

tasksRoutes.get("/", getAllTasks);

/// Handlebars

tasksRoutes.get("/list", async (req, res) => {
    const tasks = await Tasks.find();
    res.render("tasks", { tasks });
});
  
  tasksRoutes.get("/create", async (req, res) => {
    res.render("form/task");
});

tasksRoutes.post("/create/sent", async (req, res, next) => {
    Tasks.create(req.body)
        .then((Tasks) => {
          console.log(Tasks)
          res.render("entities/operationResult", {
            title : "Creating Tasks",
            icon: "check",
            message: "Tasks created succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Creating Tasks",
                    icon: "trash",
                    message: "Error while creating Tasks",
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
    Tasks.findById(id)
    .then((Tasks)=>{
        console.log("Tasks found "+Tasks);
        res.render("form/Tasks", { Tasks });
    })
    .catch((err) => next(err));
});

tasksRoutes.post("/edit/:id/sent", async (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };
    // Load the document
    const doc = await Tasks.findOne(filter);

    // Update the document using `Document#updateOne()`

await doc.updateOne(req.body).then((Tasks) => {
          console.log(Tasks)
          res.render("entities/operationResult", {
            title : "Editting Tasks",
            icon: "check",
            message: "Tasks edited succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Editting Tasks",
                    icon: "trash",
                    message: "Error while editting Tasks",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});


tasksRoutes.get("/delete/:id", async (req, res, next) => {
        const { id } = req.body;
        Tasks.findOneAndDelete(id)
        .then((Tasks) => {
          console.log(Tasks)
          res.render("entities/operationResult", { 
            title : "Deleting Tasks",
            icon: "trash",
            message: "Tasks deleted succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", {
                    title : "Deleting Tasks",
                    icon: "trash",
                    message: "Error while deleting Tasks",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});

module.exports = tasksRoutes;
