const mongoose = require("mongoose");

const escapeRoomSchema = mongoose.Schema({
    status:{type:Boolean, default:false},
    tasks:[{type: mongoose.Types.ObjectId, ref: "tasks"}]
},
{
    timestamps:true,
    collection:"escapeRoomTask"
});
const EscapeRoom = mongoose.model("escapeRoomTask", escapeRoomSchema);
module.exports = EscapeRoom;