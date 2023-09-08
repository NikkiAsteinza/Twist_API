const mongoose = require("mongoose");

const escapeRoomSchema = mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    challange: {type:String, required:true},
    players: {type:Number, required:true},
    duration:{type:Number, required:true},
    puzzles:[{type: mongoose.Types.ObjectId, ref: "puzzles"}]
},
{
    timestamps:true,
    collection:"escapeRoom"
});
const EscapeRoom = mongoose.model("escapeRoom", escapeRoomSchema);
module.exports = EscapeRoom;