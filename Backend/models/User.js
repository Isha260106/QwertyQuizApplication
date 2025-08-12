const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    usn:String,
    semester:String,
    branch:String,
    mobileNo:String,
    email:String,
});
module.exports=mongoose.model('User',userSchema);