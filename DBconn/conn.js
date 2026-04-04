const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB connection successful")).catch((err)=>{
    console.log(err)});