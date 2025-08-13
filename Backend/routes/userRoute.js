const express=require('express')
const router=express.Router()
const {loginUser, countUsers}=require('../controllers/loginUser')

router.post('/',loginUser)

router.get('/count',countUsers)

module.exports=router