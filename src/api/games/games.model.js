const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    dna: {
        type: String,
        enum : ["CLONE","PROTOTYPE"],
        default: "CLONE",
        required:true
    },
    name: {type:String, required:true},
    description: {type:String, required:true},
    status: {
        type: String,
        enum : ["IDLE","STARTED","DONE"],
        default: "IDLE",
        required:true
    },
    players: {
        type:Number,
        enum : [3,4,5,6,7,8,9,10],
        default: 4,
        required:true
    },
    duration:{
        type:Number,
        enum : [30,45,60,90],
        default: 45,
        required:true
    },
    puzzles:[{type: mongoose.Types.ObjectId, ref: "puzzles"}]
},
{
    timestamps:true,
    collection:"games"
});
const Game = mongoose.model("games", gameSchema);
module.exports = Game;