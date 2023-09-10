const { getAllPuzzles } = require("./puzzles.controller");
const Puzzle = require("./puzzles.model");

const puzzlesRoutes = require("express").Router();

puzzlesRoutes.get("/", getAllPuzzles);

/// Handlebars

puzzlesRoutes.get("/list", async (req, res) => {
    const puzzles = await Puzzle.find();
    res.render("puzzles", { puzzles });
});
  
  puzzlesRoutes.get("/create", async (req, res) => {
    res.render("form/puzzle");
});

puzzlesRoutes.post("/create/sent", async (req, res, next) => {
    Puzzle.create(req.body)
        .then((puzzle) => {
          console.log(puzzle)
          res.render("entities/operationResult", {
            title : "Creating puzzle",
            icon: "check",
            message: "Puzzle created succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Creating puzzle",
                    icon: "trash",
                    message: "Error while creating puzzle",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});

puzzlesRoutes.get("/edit/:id", async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Puzzle.findById(id)
    .then((puzzle)=>{
        console.log("puzzle found "+puzzle);
        res.render("form/puzzle", { puzzle });
    })
    .catch((err) => next(err));
});

puzzlesRoutes.post("/edit/:id/sent", async (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };
    // Load the document
    const doc = await Puzzle.findOne(filter);

    // Update the document using `Document#updateOne()`

await doc.updateOne(req.body).then((puzzle) => {
          console.log(puzzle)
          res.render("entities/operationResult", {
            title : "Editting puzzle",
            icon: "check",
            message: "Puzzle edited succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", { 
                    title : "Editting puzzle",
                    icon: "trash",
                    message: "Error while editting puzzle",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});


puzzlesRoutes.get("/delete/:id", async (req, res, next) => {
        const { id } = req.body;
        Puzzle.findOneAndDelete(id)
        .then((puzzle) => {
          console.log(puzzle)
          res.render("entities/operationResult", { 
            title : "Deleting puzzle",
            icon: "trash",
            message: "Puzzle deleted succesfully",
            goBackLink:"../list"});
        })
        .catch(err => {
            if (err) {
                console.log(err)
                res.render("entities/operationResult", {
                    title : "Deleting puzzle",
                    icon: "trash",
                    message: "Error while deleting puzzle",
                    goBackLink:"../list"});
            } else {
                console.log(err)
                next(err)
            }
        })
    
});

module.exports = puzzlesRoutes;
