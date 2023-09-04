const Puzzle = require("./puzzles.model");

const getAllPuzzles = async (req,res)=>{
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
      } catch {
        res.json("Error recovering puzzles", error);
      }
}
const createPuzzle = (req, res, next) => {
  req.body.owner = req.user;
  Puzzle.create(req.body)
      .then((newPuzzle) => {
          res.redirect('/puzzles')
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
}
module.exports = {
    getAllPuzzles,
  };