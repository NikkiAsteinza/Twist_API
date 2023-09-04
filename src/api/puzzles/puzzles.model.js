const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema({
    puzzleName:{type:String, required:true, maxLeght:50},
    description:{type:String, maxLeght:250},
    startedAt:{type:String},
    finishedAt:{type:String},
    introVideo:{type:String},
    endVideo:{type:String},
    tasks:[{type: mongoose.Types.ObjectId, ref: "tasks"}]
},
{
    timestamps:true,
    collection:"puzzles"
});
const Puzzle = mongoose.model("puzzles", puzzleSchema);
module.exports = Puzzle;