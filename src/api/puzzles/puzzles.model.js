const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema(
{
    name:{type:String, required:true, maxLeght:50},
    description:{type:String, maxLeght:250},
    tasks:[{type: mongoose.Types.ObjectId, ref: "puzzles"}]
},
{
    timestamps:true,
    collection:"puzzles"
});
const Puzzle = mongoose.model("puzzles", puzzleSchema);
module.exports = Puzzle;