var bodyParser = require('body-parser');
// Init server
const tasksRoutes = require("./src/api/tasks/tasks.routes.js");
const express = require("express");
const cors = require("cors");
// Acceso al .env
require("dotenv").config();

const PORT = process.env.PORT;

// Put this statement near the top of your module
var bodyParser = require('body-parser');

// Mongoose
//* Me traigo mi base de datos
const db = require("./src/utils/db.js");

//* Estoy ejecutando la función connectDB de mi archivo db.js que se encuentra en ./src/utils/db.js
db.connectDB();

// To create the server we need to run the express lib
const server = express();

//CORS
server.use(cors());
// HBS Templates
const hbs = require("hbs");
const Task = require("./src/api/tasks/tasks.model.js");
const Puzzle = require("./src/api/puzzles/puzzles.model.js");
const EscapeRoom = require('./src/api/escape-room/escape-room.model.js');

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
server.set("view engine", "hbs");
server.set("views", __dirname + "/views");
// Put these statements before you define any routes.
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(express.static(__dirname + "/public"));

//Render route
server.get("/", (req, res) => {
  res.render("index", { titulo: "Bienvenidx a la Twist API :)" });
});
server.get("/tasks-list", async (req, res) => {
  const tasks = await Task.find();

  res.render("tasks", { tasks });
});
server.get("/puzzles-list", async (req, res) => {
  const puzzles = await Puzzle.find();

  res.render("puzzles", { puzzles });
});
server.get("/escape-rooms-list", async (req, res) => {
  const escapeRooms = await EscapeRoom.find();

  res.render("escape-rooms", { escapeRooms });
});
server.get("/puzzles-create", async (req, res) => {
  const tasks = await Task.find();
  const isEdit = false;
  res.render("entity/create", { tasks, isEdit });
});
server.get("/puzzles-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  Puzzle.findById(id)
  .then((puzzle)=>{
        res.render("entity/create", { puzzle });
      })
      .catch((err) => next(err));
});
server.post("/puzzles-create-sent", async (req, res, next) => {
  console.log(req.body);

  Puzzle.create(req.body)
      .then((newPuzzle) => {
        console.log(newPuzzle)
        res.render("entity/create-sent", { newPuzzle });
      })
      .catch(err => {
          if (err) {
              console.log(err)
              renderWithErrors(err.errors);
          } else {
              console.log(err)
              next(err)
          }
      })
  
});
server.get("/switch-task/:id", async (req, res) => {
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

// Api routes
server.use("/tasks", tasksRoutes);
server.use("/", (req, res) => {
  res.send("Bienvenido a la Twist API");
});
// Start listening

server.listen(PORT, () => {
  console.log("Twist Server is running at http:/localhost:" + PORT);
});
