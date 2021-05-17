const mongoose=require('mongoose');
const studentTemplate=mongoose.Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    contact:{type:String, require:false},
    address1:{type:String, require:false},
    address2:{type:String, require:false},
    city:{type:String, require:false},
    local:{type:String, require:false},
    pinCode:{type:String, require:false},
    country:{type:String, require:false},
    course:{type:String, require:false},
    batch:{type:String, require:false},
    cgpa:{type:String, require:false},
    rank:{type:String, require:false},
    highMarks:{type:String, require:false},
    boardMarks:{type:String, require:false},
})

module.exports=mongoose.model('student', studentTemplate);