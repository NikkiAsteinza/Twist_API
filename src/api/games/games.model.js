const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    dna: {
        type: String,
        enum : ["CLON","PROTOTYPE"],
        default: "CLON"
    },
    status: {
        type: String,
        enum : ["IDLE","STARTED","PAUSED","DONE"],
        default: "IDLE"
    },
    name: {type:String, required:true},
    description: {type:String, required:true},
    challange: {type:String, required:true},
    players: {type:Number, required:true},
    duration:{type:Number, required:true},
    puzzles:[{type: mongoose.Types.ObjectId, ref: "puzzles"}]
},
{
    timestamps:true,
    collection:"games"
});
const Game = mongoose.model("games", gameSchema);
module.exports = Game;