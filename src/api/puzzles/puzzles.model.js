const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema({
    name:{Type:String, required:true , maxLenght:50},
    status:{Type:Boolean, required:true, default:false},
    started_at:{type:Date},
    finished_at:{type:Date},
    intro_video:{type:String},
    end_video:{type:String},
    // tasks:{type:mongoose.Schema.Types.tasks[]}
});

const Puzzle = mongoose.model("puzzles", puzzleSchema);
module.exports = {Puzzle}