const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/gymBackend")
.then(()=>console.log("MongoDB connection successfull")).catch((err)=>{
    console.log(err)});