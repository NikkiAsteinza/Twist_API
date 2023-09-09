var bodyParser = require("body-parser");
// Get routes
const tasksRoutes = require("./src/api/tasks/tasks.routes.js");
const puzzlesRoutes = require("./src/api/puzzles/puzzles.routes.js");
const gamesRoutes = require("./src/api/games/games.routes.js");
// Init server
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");
// Acceso al .env
require("dotenv").config();

const PORT = process.env.PORT;

// Put this statement near the top of your module
var bodyParser = require("body-parser");

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


hbs.registerPartials(__dirname + "/views/partials", function (err) {});
server.set("view engine", "hbs");
server.set("views", __dirname + "/views");

// Put these statements before you define any routes.
server.use(bodyParser.json());
server.use(express.static(__dirname + "/public"));
server.use("handlebars", hbs.engine({
  defaultLayout:"index",
  layoutDir: path.join(__dirname, "views")
}));
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));
//Render route
server.get("/", (req, res) => {
  res.render("index", { titulo: "Bienvenidx a la Twist API :)" });
});

// Api routes
server.use("/tasks", tasksRoutes);
server.use("/puzzles", puzzlesRoutes);
server.use("/games", gamesRoutes);

// Start listening
server.listen(PORT, () => {
  console.log("Twist Server is running at http:/localhost:" + PORT);
});
