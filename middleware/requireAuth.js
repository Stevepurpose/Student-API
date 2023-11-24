const jwt=require('jsonwebtoken')
const Teacher=require('../models/teacherModel')


//create middleware to check user auth

async function authCheck(req,res,next){

    //verify authentication
let {authorization}=req.headers
if(!authorization){
    return res.json({error:'authorization token required'})
}

const token=authorization.split(' ')[1]
try{
    const{_id}=jwt.verify(token,process.env.TOKEN_SECRET)

    req.teacher=await Teacher.findOne({_id}).select('_id')
    
    next()
}
catch(error){
    res.json({error:'request not authorized'})
}

}

module.exports=authCheck