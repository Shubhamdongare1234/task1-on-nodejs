var express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const connection = require('../controller/connection');
const router=express.Router();
//const connection=require('../controller/connection');
router.post('/',(req,res,next)=>{
    const name=req.body.name;
    const password=req.body.password;
    console.log(req.body);
    connection.query(`select * from user where name='${name}'`,async(err,result)=>{
        if(err){
            res.send(err);

        }else{
            console.log(result);
            const isSame=await bcrypt.compare(password,result[0].password);
            console.log(password);
            if(isSame){
                const token=jwt.sign({id:result[0].id,mobile:result[0].mobile},"secretkey",{expiresIn:60*60});
                  console.log(token);
                res.send({error:false,token:token,message:"login successfully"});
            }else{
                res.send({error:true,message:"loggin unsccessfully"});
            }
        }
    })
});
module.exports=router;