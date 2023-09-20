// Get routes
const tasksRoutes = require("./src/api/tasks/tasks.routes.js");
const puzzlesRoutes = require("./src/api/puzzles/puzzles.routes.js");
const gamesRoutes = require("./src/api/games/games.routes.js");
// Init server
const express = require("express");
const hbs = require("hbs");
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const cors = require("cors");
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
server.use(jsonParser);
server.use(urlencodedParser);

//Handlebars support
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
server.set("view engine", "hbs");
server.set("views", __dirname + "/views");

// Define the eq helper
hbs.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

// Put these statements before you define any routes.
server.use(express.static(__dirname + "/public"));

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
