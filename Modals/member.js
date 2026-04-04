// const { address } = require('framer-motion/client');
const mongoose = require('mongoose');

const memberScema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    mobileNo:{
        type:String,
    },
    address:{
        type:String,
    },
    membership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"membership",
        required:true
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true
    },
    profilePic:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Active"
    },
    lastPayment:{
        type:Date,
        default:new Date()
    },
    nextBillDate:{
        type:Date,
        require:true,
    },
    joiningDate:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const memberModel = mongoose.model("member",memberScema)
module.exports = memberModel;