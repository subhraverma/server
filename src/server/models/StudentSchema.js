const mongoose=require('mongoose');

const stdSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    motherName:String,
    fatherName:String,
    address: String,
    gender:String,
    state: String,
    city:String,
    dob:String,
    pin:String,
    course:String,
    email: String,
});

const StudentSchema=mongoose.model('students',stdSchema);

module.exports={StudentSchema};
