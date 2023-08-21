const mongoose = require("mongoose");

const escapeRoomSchema = mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    challange: {type:String, required:true},
    players: {type:Number, required:true},
    duration:{type:Number, required:true},
    price: {type:Number,required:true},
    prize:{type:String},
    prize_url:{type:String}
    // puzzles: {type:puzzles}
});