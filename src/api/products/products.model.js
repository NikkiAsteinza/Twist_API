const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    type:{
        type:String,
        required:true,
        enum: ["EscapeRoom","Digitalization"]},
});