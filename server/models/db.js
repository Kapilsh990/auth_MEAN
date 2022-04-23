const mongoose = require('mongoose');
// const config = require('../config/config')

// console.log("dsad",process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL,(err)=>{
    if(!err){
        console.log("Connected")
    }else{
        console.log("err",err)
    }
});