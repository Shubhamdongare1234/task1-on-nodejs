var mysql=require('mysql');
const connection=mysql.createConnection({
    host:'localhost',
    user:'shubham',
    password:'shubham',
    database:'task1'
});
connection.connect((err)=>{
    if(err){
        console.log("error in connecting database");
    }else{
        console.log("database connected successfully");
    }
});
module.exports=connection;