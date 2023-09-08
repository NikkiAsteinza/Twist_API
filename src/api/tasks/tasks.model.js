const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name:{type:String, required:true, maxLeght:50},
    description:{type:String, maxLeght:250},
    clue:{type:String},
},
{
    timestamps:true,
    collection:"tasks"
});

const Task = mongoose.model("tasks",taskSchema);
module.exports = Task;