const Game = require("./games.model");

const gamesRoutes = require("express").Router();

gamesRoutes.get("/list", async (req, res) => {
    const games = await Game.find();
  
    res.render("games", { games });
});

gamesRoutes.get("/create", async (req, res) => {
    const games = await Game.find();
  
    res.render("form/game", { games });
});

module.exports = gamesRoutes;
