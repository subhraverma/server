const JWT=require('jsonwebtoken');

const MiddleWare=async(req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization.split(' ')[1],
        process.env.JWT_TOKEN);
        req.user=decode;
     next();
    } catch (error) {
        console.log('Invalid Token');
        res.send('Invalid Token')
    }
};

module.exports={MiddleWare};