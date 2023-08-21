const { getAllTasks } = require("./tasks.controller");

const tasksRoutes = require("express").Router();

tasksRoutes.get("/",getAllTasks);

module.exports = tasksRoutes;