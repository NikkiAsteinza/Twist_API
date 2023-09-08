const Game = require("./games.model");

const gamesRoutes = require("express").Router();

gamesRoutes.get("/games-list", async (req, res) => {
    const games = await Game.find();
  
    res.render("games", { games });
});

module.exports = gamesRoutes;
