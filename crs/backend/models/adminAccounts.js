const mongoose=require('mongoose');
const adminAccountTemplate=mongoose.Schema({
    email:{type:String, require:true},
    password:{type:String, require:true}
})
module.exports=mongoose.model("adminaccounts", adminAccountTemplate);