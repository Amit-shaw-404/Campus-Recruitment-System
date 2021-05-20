const mongoose=require('mongoose');
const studentSignup=mongoose.Schema({
    email:{type:String, require:true},
    id:{type:String, require:true},
    password:{type:String, require:true},
    date:{type:Date, default:Date.now}
})

module.exports=mongoose.model("studentSignup", studentSignup);