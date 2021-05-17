const mongoose=require('mongoose');
const studentSignup=mongoose.Schema({
    email:{type:String, require:true},
    enroll:{type:String, require:true},
    password:{type:String, require:true},
    date:{type:Date, default:Date.now}
})

module.exports=mongoose.model("student", studentSignup);