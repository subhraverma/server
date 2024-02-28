const{RegisterSchema}=require('../models/RegisterSchema');
const jwt =require('jsonwebtoken');
const RegisterController=async(req,res)=>{
try {
   const {name,email,password,repeatPass,rememberMe}=req.body;
   const user= new RegisterSchema({name,email,password,repeatPass,rememberMe});
   const register=await user.save();
   res.send(register);
   console.log(register);
} catch (error) {
    console.log(error);
}
};

const LoginController = async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await RegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (user) {
      let token = await jwt.sign({email: user.email }, process.env.SECRET_KEY, { expiresIn: '2h' })
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: user._id,
          email: user.email,
          token: token,
        },
        error: false,
        status: true,
      });
      console.log(user._id);
      console.log("TOKEN-",token);

    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports={
    RegisterController,
     LoginController

}