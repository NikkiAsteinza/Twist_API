const Puzzle = require("./puzzles.model");

const getAllPuzzles = async (req,res)=>{
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
      } catch {
        res.json("Error recovering puzzles", error);
      }
}

module.exports = {
    getAllPuzzles
  };