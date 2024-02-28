const express=require('express');
const Router=express.Router();

const{
    StudentAddController,
    StudentGetController,
    StdUpdateController,
    StdDeleteController,
}=require('../Controllers/StudentController');

const {
    RegisterController,
    LoginController,
}=require('../Controllers/RegisterController');

const {
    AddTeachController,
    GetTeachController,
    PutTeachController,
    DelTeachController,
    LoginTeachController,
}=require('../Controllers/TeacherController');

//Student Controller
Router.route('/student').post(StudentAddController);
Router.route('/student').get(StudentGetController);
Router.route('/student/:_id').put(StdUpdateController);
Router.route('/student/:_id').delete(StdDeleteController);

//Teacher Controller
Router.route('/teacher').post(AddTeachController);
Router.route('/teacher').get(GetTeachController);
Router.route('/teacher/:_id').put(PutTeachController);
Router.route('/teacher/:_id').delete(DelTeachController);
Router.route('/teachLogin').post(LoginTeachController);

//Register Controller
Router.route('/register').post(RegisterController);
Router.route('/login').post(LoginController);

module.exports=Router;