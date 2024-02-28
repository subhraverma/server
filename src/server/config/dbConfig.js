const mongoose=require('mongoose');

const conn=mongoose.connect(process.env.MONGO_URL);

console.log('DB Connect...');