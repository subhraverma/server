const express=require("express");
const cors=require('cors');
const env=require('dotenv');
const app=express();
app.use(cors());
app.use(express.json());
env.config();
const Router=require('./Routers/Router')
const PORT= process.env.PORT || 8000;
require('./config/dbConfig');

app.use('/project2',Router);


 app.listen(PORT,()=>{
    console.log(`Server started port ${PORT}`)
})