const mongoose=require('mongoose');

const Schema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const   TeacherSchema= mongoose.model('teachers',Schema);

module.exports={TeacherSchema};