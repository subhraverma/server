const mongoose=require('mongoose');

const regSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    repeatPass:String
});
const RegisterSchema=mongoose.model('register',regSchema);
module.exports={
    RegisterSchema,

};
