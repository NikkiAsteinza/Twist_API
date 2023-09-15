const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema(
{
    owner:[{type: mongoose.Types.ObjectId, ref:"games"}],
    name:{type:String, required:true, maxLeght:50},
    description:{type:String, maxLeght:250},
    tasks:[{type: mongoose.Types.ObjectId, ref: "tasks"}],
    status: {
        type: String,
        enum : ["IDLE","DONE"],
        default: "IDLE"
    },
},
{
    timestamps:true,
    collection:"puzzles"
});
const Puzzle = mongoose.model("puzzles", puzzleSchema);
module.exports = Puzzle;