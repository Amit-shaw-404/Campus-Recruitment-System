const mongoose=require('mongoose');
const student=mongoose.Schema({
    id:{type:String, require:true}
})
module.exports=mongoose.model("students", student);