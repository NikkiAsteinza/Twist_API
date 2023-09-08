const mongoose = require("mongoose");

const escapeRoomPuzzleSchema = mongoose.Schema({
    status:{type:Boolean, default:false},
    startedAt:{type:String, default:"n/a"},
    finishedAt:{type:String, default:"n/a"},
    introVideo:{type:String},
    endVideo:{type:String},
    escapeRoomPuzzle:[{type: mongoose.Types.ObjectId, ref: "escapeRoomPuzzle"}]
},
{
    timestamps:true,
    collection:"escapeRoomPuzzle"
});
const EscapeRoomPuzzle = mongoose.model("escapeRoomPuzzle", escapeRoomPuzzleSchema);
module.exports = EscapeRoomPuzzle;