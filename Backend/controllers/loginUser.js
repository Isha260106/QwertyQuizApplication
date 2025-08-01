const User=require('../models/User')

const loginUser=async(req,res)=>{
    try{
        const user=new User(req.body)
        await user.save()
        res.status(201).json({message:'User logged in'})
    }catch(err){
        res.status(500).json({message:'Error logging in',err})
    }
}
module.exports={loginUser}