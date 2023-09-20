const Puzzle = require("../puzzles/puzzles.model");
const Task = require("../tasks/tasks.model");
const Game = require("./games.model");
const gamesRoutes = require("express").Router();

// HANDLEBARS

gamesRoutes.get("/list", async (req, res) => {
    Game.find().then((games)=>{
        res.render("games", { games });
    });
});

gamesRoutes.get("/create", async (req, res) => { 
    const puzzles = await Puzzle.find();
    res.render("form/game", puzzles);
});

gamesRoutes.post("/create/sent", async (req, res, next) => {
    Game.create(req.body)
        .then((newGame) => {
          console.log(newGame)
          res.render("entities/operationResult", {
            title : "Creating game",
            icon: "check",
            message: "Game created succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Creating game",
                    icon: "trash",
                    message: "Error while creating game",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});

gamesRoutes.get("/edit/:id", async (req, res, next) => {
    const { id } = req.params;
    const puzzles = await Puzzle.find();
    console.log(id);
    Game.findById(id)
    .then((game)=>{
        console.log("game found "+game);
        res.render("form/game", { game, puzzles });
    })
    .catch((err) => next(err));
});

gamesRoutes.post("/edit/:id/sent", async (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };
    // Load the document
    const doc = await Game.findOne(filter);

    // Update the document using `Document#updateOne()`

await doc.updateOne(req.body).then((newGame) => {
          console.log(newGame)
          res.render("entities/operationResult", {
            title : "Editting game",
            icon: "check",
            message: "Game edited succesfully",
            goBackLink:"../../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Editting game",
                    icon: "trash",
                    message: "Error while editting game",
                    goBackLink:"../../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});


gamesRoutes.get("/delete/:id", async (req, res, next) => {
        const { id } = req.params;
        
        Game.findByIdAndDelete(id)
        .then((newGame) => {
          console.log(newGame)
          res.render("entities/operationResult", { 
            title : "Deleting game",
            icon: "trash",
            message: "Game deleted succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", {
                    title : "Deleting game",
                    icon: "trash",
                    message: "Error while deleting game",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});
module.exports = gamesRoutes;
