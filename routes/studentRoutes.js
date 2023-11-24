const express = require('express')
const router=express.Router()

const{getStudents,createStudent,getStudent,removeStudent,updateStudent}=require('../controllers/studentController')
const authCheck=require('../middleware/requireAuth')

router.use(authCheck) //load  middleware


router.get('/', getStudents)


router.post('/', createStudent)

router.get('/:studentId', getStudent)


router.delete('/:studentId',removeStudent)



router.patch('/:studentId', updateStudent)


module.exports=router