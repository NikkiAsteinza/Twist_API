const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema(
{
    dna: {
        type: String,
        enum : ["CLONE","PROTOTYPE"],
        default: "CLONE"
    },
    name: {type:String, required:true},
    description: {type:String, required:true},
    status: {
        type: String,
        enum : ["IDLE","STARTED","DONE"],
        default: "IDLE"
    },
    owner:[{type: mongoose.Types.ObjectId, ref:"games"}],
    tasks:[{type: mongoose.Types.ObjectId, ref: "tasks"}],
},
{
    timestamps:true,
    collection:"puzzles"
});
const Puzzle = mongoose.model("puzzles", puzzleSchema);
module.exports = Puzzle;