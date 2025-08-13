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

const countUsers=async(req,res)=>{
    try{
        const count=await User.countDocuments({})
        res.json({userCount : count})
    }
    catch(err){
        res.status(500).json({message:'Error getting count',err})
    }
}
module.exports={loginUser,countUsers}