const { getAllPuzzles } = require("./puzzles.controller");

const puzzlesRoutes = require("express").Router();

puzzlesRoutes.get("/",getAllPuzzles);

module.exports = puzzlesRoutes;