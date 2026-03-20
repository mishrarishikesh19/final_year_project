const mongoose = require('mongoose');

const gymSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePic:{
        type:String,
        require:true,
    },
    gymName:{
        type:String,
        require:true,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
},{timestamps:true})

const model = mongoose.model('gym',gymSchema);

module.exports = model;