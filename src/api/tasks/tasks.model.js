const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
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
    owner:[{type: mongoose.Types.ObjectId, ref: "puzzle"}],
    clue:{type:String},
    introVideo:{type:String},
    endVideo:{type:String},
},
{
    timestamps:true,
    collection:"tasks"
});

const Task = mongoose.model("tasks",taskSchema);
module.exports = Task;