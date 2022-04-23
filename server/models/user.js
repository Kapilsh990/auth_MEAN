const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required: true , unique: true},
    password:{type:String ,required: true},
    saltSecret:String
})


var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
