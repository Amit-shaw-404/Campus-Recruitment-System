const mongoose=require('mongoose');
const studentTemplate=mongoose.Schema({
    firstName:{type:String, require:true},
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    contact:{type:String, require:true},
    address1:{type:String, require:true},
    address2:{type:String, require:true},
    city:{type:String, require:true},
    local:{type:String, require:true},
    pinCode:{type:String, require:true},
    country:{type:String, require:true},
    course:{type:String, require:true},
    batch:{type:String, require:true},
    cgpa:{type:String, require:true},
    rank:{type:String, require:true},
    marks12:{type:String, require:true},
    marks10:{type:String, require:true},
    startDate:{type:String, require:true},
    applyBy:{type:String, require:true},
    boards12:{type:String, require:true},
    boards10:{type:String, require:true},
})

module.exports=mongoose.model('studentDetails', studentTemplate);