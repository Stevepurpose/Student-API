const mongoose = require('mongoose')
const Student=require('../models/studentModel')

const getStudents=async function(req,res){
    try{
        const teacher_Id=req.teacher._id
        const students = await Student.find({teacher_Id})
       console.log(students)
       res.status(200).json(students)
    
    }
       catch(err){
        res.json({message:"could not fetch students"})
    }
   
}


const createStudent=async function(req,res){
    const{firstName,lastName,age,classNumber,address}=req.body
    try{
    const teacher_Id=req.teacher._id
    const student=await Student.create({firstName,lastName,age,classNumber,address,teacher_Id})
    res.status(201).json(student)
    
        }
        catch(err){
            res.json({message:"could not add student"})
        }
}

const getStudent=async function(req,res){
    try{
        const studentId = req.params.studentId
        //if id is not a mongoose type
if(!mongoose.Types.ObjectId.isValid(studentId)){
    return res.status(404).json("student id is not a valid  type")
}

    const student = await Student.findById(studentId)
    

    if(!student){
        return res.status(404).json("student not found")
    }
    res.status(200).json(student)
    }

    catch(err){
        res.json({message:"could not fetch student"})
    } 
}   

const removeStudent=async function(req,res){
    try{
        const{studentId}=req.params
         
        const student = await Student.findOneAndDelete({_id:studentId})
 
res.status(204).json("deleted")
    }

catch(err){
    res.json({message:"could not delete student"})
}
}


const updateStudent= async function(req,res){
    try{
        const{studentId}=req.params
    
      const student = await Student.findByIdAndUpdate(studentId,{...req.body})
  if(!student){
      return res.status(404).json("Drug not found")
  }
  res.status(200).json(student)
      }
  catch(err){
      res.json({message:"could not update student"})
  }
}

module.exports={getStudents,createStudent,getStudent,removeStudent,updateStudent}
