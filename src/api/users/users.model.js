const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username:{type:String, trim:true, required:true, unique: true},
        password:{type:String,trim:true, required:true, unique:true},
        rol:{type:String, enum:["admin","member"], default:"member", trim:true, required:true},
        name:{type:String, required:true},
        lastName:{type:String, required:true},
        email:{type:String, required:true},
    }
);