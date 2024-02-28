const{StudentSchema}=require('../models/StudentSchema');
const StudentAddController=async(req,res)=>{
    try {
        const {
        firstName,
        lastName,
        motherName,
        fatherName,
        address,
        dob,
        course,
        email
    }=req.body;
        const data=  new StudentSchema({
            firstName,
            lastName,
            motherName,
            fatherName,
            address,
            dob,
            course,
            email
        })
       const std=await data.save();
        res.send(std);
        console.log(std);
    } catch (error) {
        console.log(error);
    }
};

const StudentGetController=async(req,res)=>{
  try {
    const data=await StudentSchema.find();
    res.send(data);
    console.log(data);   
  } catch (error) {
    console.log(error);
  }
};

const StdUpdateController=async(req,res)=>{
    try {
        const{ 
             firstName,
            lastName,
            motherName,
            fatherName,
            address,
            dob,
            course,
            email
        }=req.body;
        const{_id}=req.params;
        const data=await StudentSchema({_id:id},{$set:{ 
             firstName,
            lastName,
            motherName,
            fatherName,
            address,
            dob,
            course,
            email
        }});
        res.send(data);
        console.log(data);
    } catch (error) {
        console,log(error);
    }
};

const StdDeleteController=async(req,res)=>{
    try {
        const{_id}=req.params;
        const data=await StudentSchema.deleteOne({_id:_id});
        res.send(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    StudentAddController,
    StudentGetController,
    StdUpdateController,
    StdDeleteController,

}