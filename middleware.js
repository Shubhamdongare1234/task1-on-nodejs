var jwt=require('jsonwebtoken');
const checktoken=(req,res,next)=>{
    const token=req.headers.token;
    if(token){
        jwt.verify(token,"secretkey",(err,decoded)=>{
            if(err){
                return res.status(401).json({message:"token invalid"});
            }else{
                req.user=decoded;
                console.log(decoded);
                next();
            }
        })
    }else{
        res.send({error:true,message:"token not provided"});
    }
};
module.exports={checktoken:checktoken};