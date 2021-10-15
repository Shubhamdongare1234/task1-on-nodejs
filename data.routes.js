var express=require('express');
const bcrypt=require('bcrypt');
//const jwt=require('jsonwebtoken');
const { body,check,validationResult } = require('express-validator');
const connection = require('../controller/connection');
var router=express.Router();
router.post('/create_user',body('id').notEmpty().withMessage("id should not be empty").isNumeric().withMessage("id should be number"),
body('name').notEmpty().withMessage("name should not be empty").isAlpha().withMessage("name should be alphabatic"),
body('mobile').notEmpty().withMessage("mobile number should not be empty").isNumeric().withMessage("mobile number should be in number"),
body('password').notEmpty().withMessage("password should not be empty").isAlpha().withMessage("password should be chracter"),async(req,res,next)=>{
try{
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()});
    }else{
        const data=req.body;
        const salt=await bcrypt.genSalt(10);
        const password=await bcrypt.hash(req.body.password,salt);
        connection.query(`INSERT INTO user(id, name, mobile, password) VALUES (0,'${data.name}',${data.mobile},'${password}')`,(err,result)=>{
           console.log(result);
            if(result.affectedRows>0){
                res.send({error:false,message:"data added"});
            }else{
                res.send({error:true,message:"record unable to add"});
            }
        })
    }
}catch(err){
    res.send({error:true,message:"validation not performed well"});
}
});
///mobile data
router.post('/create',body('name').notEmpty().withMessage("you should enter the name"),
body('model_no').notEmpty().withMessage("you should enter the model number of mobile").isNumeric().withMessage("model number of mobile should be in number "),
body('RAM').notEmpty().withMessage("you should enter the mobile RAM "),
body('size').notEmpty().withMessage("you should enter the mobile size"),
body('storage').notEmpty().withMessage("you should enter the mobile storage"),
body('price').notEmpty().withMessage("you should enter the mobile price").isNumeric().withMessage("mobile price should be in rupees number"),async(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors.array(),message:"error in validation"});
        }else{
            let data=req.body;
            connection.query(`INSERT INTO mobile(m_no, m_name, model_no, m_ram, m_size, m_storage, m_price) VALUES(0,'${data.name}',${data.model_no},'${data.RAM}','${data.size}','${data.storage}',${data.price})`,(err,result)=>{
                console.log(result);
                if(result.affectedRows>0){
                    res.send({error:false,message:"data added"});
                }else{
                    res.send({error:true,message:"data not added"});
                }
            })
        }
    }catch(err){
        res.send({error:true,message:"validation not perfomed correctly"});
    }
});
router.post('/find',body('id').notEmpty().withMessage("for find data id require").isNumeric().withMessage("id should be numeric"),async(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors,data:[]});
        }else{
    
        const id=req.body.id;
          connection.query(`select * from mobile where m_no=${id}`,(err,result)=>{
              if(err){
                  res.send({error:true,messgae:"error in finding record"});
              }else{
                  res.send({error:false,data:result});
              }
          })
        }
    }catch(err){
        res.send({error:true,message:"error in validation"});
    }
   
});
router.post('/delete',body('id').notEmpty().withMessage("should enter the id to delete record").isNumeric().withMessage("is should be numeric"),async(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors,data:[]});
        }else{
            let id=req.body.id;
            connection.query(`DELETE FROM mobile WHERE m_no=${id}`,(err,result)=>{
                console.log(result);
                if(result.affectedRows>0){
                    res.send({error:false,message:"record deleted"});
                }else{
                    res.send({error:true,message:"record not deleted"});
                }
            })
        }
    }catch(err){
        res.send({error:true,message:"problem in deletetion"});
    }
});
router.post('/update',body('no').notEmpty().withMessage("enter the mobile index number where you want update"),body('name').notEmpty().withMessage("enter mobile name"),body('model_no').notEmpty().withMessage("enter the model number of mobile"),body('RAM').notEmpty().withMessage("enter the mobile RAM"),body('size').notEmpty().withMessage("enter the siz eof mobile"),body('storage').notEmpty().withMessage("enter the storage of mobile"),body('price').notEmpty().withMessage("enter the price of mobile"),async(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors.array()});
        }else{
               let data=req.body;
               connection.query(`UPDATE mobile SET m_name='${data.name}',model_no=${data.model_no},m_ram='${data.RAM}',m_size='${data.size}',m_storage='${data.storage}',m_price=${data.price} WHERE m_no=${data.no}`,(err,result)=>{
                   console.log(result);
                   if(result.affectedRows>0){
                       res.send({error:false,message:"row updated"});
                   }else{
                       res.send({error:true,message:"row not updated"});
                   }
               })
        }
    }catch(err){
        res.send({error:true,message:"validation not performed rightly"});
    }
});



module.exports=router;