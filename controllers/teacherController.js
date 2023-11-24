const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Teacher=require('../models/teacherModel')
const jwt=require('jsonwebtoken')
const validator=require('validator')


const createToken=(_id)=>{
    //_id mongodb id property
    //TOKEN_SECRET some secret string saved in  my .env file
    //expiresIn this is time taken for token to expire
    return jwt.sign({_id},process.env.TOKEN_SECRET,{expiresIn:'5d'})
}


const signupUser=async function(req,res){
    const{email,password}=req.body

  try{ 

    if(!email || !password){
        throw Error('fill  all empty fields')
    }
    
    if(!validator.isEmail(email)){
        throw Error('email not valid')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong enough')
    }

    const exists = await Teacher.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

const teacher=await Teacher.create({email,password:hashedPass})

const token=createToken(teacher._id)
//send back the email and token to client
res.status(200).json({email,token}) 
  }
  catch(error){
   res.status(400).json({error:error.message})
  }

}




const loginUser=async function(req,res){
    const{email,password}=req.body
    try{

        if(!email || !password){
            throw Error('fill  all empty fields')
        }

    const teacher = await Teacher.findOne({email})
    if(!teacher){
        throw Error('Email already in use')
    }
// teacher.password is the previously hashed password
//password is the login password
    const checkMatch=await bcrypt.compare(password,teacher.password) 

    if(!checkMatch){
    throw Error('incorrect password')
}

const token=createToken(teacher._id)
res.status(200).json({email,token}) 
    }
    catch(error){

        
     res.status(404).json({error:error.message})
       
    }

}


module.exports={signupUser,loginUser}