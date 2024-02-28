const { TeacherSchema } = require('../models/TeacherSchema');

const AddTeachController = async (req, res) => {
    try {
        const {name,email,password}=req.body;
        const data= new TeacherSchema({name,email,password});
        const result=await data.save();
        res.send(result);
        console.log(result);

    } catch (error) {
        console.log(error);
    }
};

const GetTeachController = async (req, res) => {
    try {
        const data=await TeacherSchema.find();

        res.send(data);
        console.log(data);

    } catch (error) {
        console.log(error);
    }
};

const PutTeachController = async (req, res) => {
    try {
        const {_id}=req.params;
        const {name,email,password}=req.body;
        const data= await TeacherSchema.updateOne({_id:_id},{$set:{name,email,password}});

        res.send(data);
        console.log(data);

    } catch (error) {
        console.log(error);
    }
};

const DelTeachController = async (req, res) => {
    try {
        const {_id}=req.params;
        const data=await TeacherSchema.deleteOne({_id:_id});

        res.send(data);
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

const LoginTeachController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await TeacherSchema.findOne({ email: email, password: password });
        res.send(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    LoginTeachController,
    AddTeachController,
    GetTeachController,
    PutTeachController,
    DelTeachController
}

