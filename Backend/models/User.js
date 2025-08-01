const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    usn:String,
    email:String,
    score:Number,
});
module.exports=mongoose.model('User',userSchema);