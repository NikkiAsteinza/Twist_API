// Init server
const tasksRoutes = require("./src/api/tasks/tasks.routes.js");
const express = require("express");
const cors =require("cors");
// Acceso al .env
require("dotenv").config();

const PORT = process.env.PORT;

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
const hbs = require('hbs');
const Task = require("./src/api/tasks/tasks.model.js");

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
server.set('view engine', 'hbs');
server.set("views", __dirname + "/views");

server.use(express.static(__dirname + "/public"));

//Render route
server.get("/", (req, res) => {
    res.render('index', {titulo: 'Bienvenidx a la Twist API :)'})
  });
  server.get('/tasks-list', async (req, res) => {

    const tasks = await Task.find();

    res.render('tasks',  { tasks });
}
);

server.use("/tasks", tasksRoutes);
server.use("/", (req, res) => {
  res.send("Bienvenido a la Twist API");
});
// Start listening

server.listen(PORT, () => {
  console.log("Twist Server is running at http:/localhost:" + PORT);
});
