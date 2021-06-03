const mongoose = require('mongoose');

const jobTemplate = mongoose.Schema({
    jobTitle:{type:String, require:true},
    companyName:{type:String, require:true},
    location:{type:String, require:true, default:""},
    workFromHome:{type:Boolean, default:true},
    startDate:{type:String, require:true},
    applyBy:{type:String, require:true},
    salary:{type:String, require:true},
    companyRank:{type:String, require:true},
    companyDescription:{type:String, require:true},
    jobDescription:{type:String, require:true},
    eligibility:{type:String, require:true},
    noOfOpening:{type:String, require:true},
    perks:{type:String, require:true},
    applied:[String],
    accepted:[String]
});
module.exports = mongoose.model('Jobs',jobTemplate);