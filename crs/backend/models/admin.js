const mongoose=require('mongoose');
const admin=mongoose.Schema({
    id:{type:String, require:true}
})
module.exports=mongoose.model("admin", admin);