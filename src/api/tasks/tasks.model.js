const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    owner:[{type: mongoose.Types.ObjectId, ref: "puzzle"}],
    name:{type:String, required:true, maxLeght:50},
    description:{type:String, maxLeght:250},
    clue:{type:String},
    introVideo:{type:String},
    endVideo:{type:String},
    status: {
        type: String,
        enum : ["IDLE","DONE"],
        default: "IDLE"
    },
},
{
    timestamps:true,
    collection:"tasks"
});

const Task = mongoose.model("tasks",taskSchema);
module.exports = Task;