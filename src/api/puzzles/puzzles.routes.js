const { getAllPuzzles } = require("./puzzles.controller");
const Puzzle = require("./puzzles.model");

const puzzlesRoutes = require("express").Router();

puzzlesRoutes.get("/",getAllPuzzles);

/// Handlebars

puzzlesRoutes.get("/delete/:id", async (req, res) => {
    const { id } = req.body;
    Puzzle.findOneAndDelete(id)
    .then(()=>{
        console.log("Successful deletion");
        res.render("entities/deleted",  {name:id} );
    }).catch((err) => next(err));
});

puzzlesRoutes.get("/list", async (req, res) => {
    const puzzles = await Puzzle.find();
  
    res.render("puzzles", { puzzles });
  });

puzzlesRoutes.get("/create", async (req, res) => {
const puzzles = await Puzzle.find();
const isEdit = false;
res.render("entity/create", { puzzles, isEdit });
});

puzzlesRoutes.get("/edit/:id", async (req, res, next) => {
const { id } = req.params;
Puzzle.findById(id)
.then((puzzle)=>{
        res.render("entity/create", { puzzle });
    })
    .catch((err) => next(err));
});

puzzlesRoutes.post("/create/success", async (req, res, next) => {
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
module.exports = puzzlesRoutes;