const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const jwt=require("jsonwebtoken");
const jobTemplate=require('./models/jobDescription');
const Student=require('./models/student');
const StudentSignup=require('./models/studentSignUp');
const Admin=require('./models/admin');
const studentTemplate=require('./models/studentRegister');
const adminAccountTemplate = require('./models/adminAccounts');
const multer = require('multer');
const path = require('path');
const fs =require('fs');
dotenv.config();

//Connecting mongodb 
mongoose.connect(process.env.Database_access, ()=>console.log("database connected"));

//middlewares
app.use(cors());
app.use(express.json());

app.post('/student_signIn', (req, res)=>{
    const {email, password}=req.body;
    StudentSignup.find({email:email, password:password}, (err, result)=>{
        if(err){
            res.status(404).send("Login error");
        }else{
            if(result.length!=0){
                const id=result[0].email;
                const token=jwt.sign({id}, process.env.secret_key, {
                    expiresIn:3000
                })
                res.send({user:result, token:token});
            }else{
                res.status(404).send("Invalid credentials");
            }
        }
    })
})
app.post('/admin_signIn', (req, res)=>{
    const {email, password}=req.body;
    adminAccountTemplate.find({email:email, password:password}, (err, result)=>{
        if(err){
            res.status(404).send("Login error");
        }else{
            if(result.length!=0){
                const id=result[0].email;
                const token=jwt.sign({id}, process.env.secret_key, {
                    expiresIn:3000
                })
                res.send({user:result, token:token});
            }else{
                res.status(404).send("Invalid email id or password");
            }
        }
    })
})
const verifyJwt=(req, res, next)=>{
    const token=req.headers['x-access-token'];
    if(!token){
        res.status(404).send("token invalid");
    }else{
        jwt.verify(token, process.env.secret_key, (err, decoded)=>{
            if(err){
                res.status(404).send("Invalid request");
            }else{
                next();
            }
        })
    }
}
app.get("/student_home", verifyJwt, (req, res)=>{
    res.send("You have access");
})
app.get("/admin_home", verifyJwt, (req, res)=>{
    res.send("You have access");
})

app.post("/student_details", (req,res) => {
    const {path} = req.body;
    //console.log(path);
    studentTemplate.find({registration:path}, (err,result) => {
        if(err){
            // console.log(err)
        }
        else{
            //console.log(result)
            res.send(result); //result's length may be zero. in that case we will check it in stufent registration
        }
    })
})

app.post('/applicationStatus',(req,res)=>{
    const status = req.body.status;
    const jobId = req.body.jobId;
    const enroll = req.body.studentId;
    var job=[];

    jobTemplate.find({_id:jobId}, (err, result)=>{
        if(err){
            console.log(jobId);
            res.status(404).send(err);
            console.log("Error in connecting with jobDetails db: "+err);
        }else{
            var accepted = result[0].accepted;
            var flag=0;
            for(let i=0; i<accepted.length; i++){
                if(accepted[i]==enroll){
                    flag=1;
                    break;
                }
            }
            //Updating student status for this job
            studentTemplate.find({registration: enroll}, (err, result1)=>{
                if(err){
                    res.status(404).send(err);
                }else{
                    job=result1[0].job;
                    for(var i=0; i<job.length; i++){
                        if(job[i].jobId==jobId){
                            job[i].status=status;
                        }
                    }
                    studentTemplate.updateOne({registration: enroll}, {$set:{"job":job}})
                    .then(res=>{})
                    .catch(err={})
                }
            })

            if(status=="Application submitted"){
                console.log(status)
            }
            if(status=="Selected for interview"){
                console.log(status)
            }
            if(status=="Rejected"){
                console.log(status)
                if(flag){
                    console.log(flag);
                    jobTemplate.updateOne({_id:mongoose.Types.ObjectId(jobId)},{$pull:{
                        accepted:enroll
                    }})
                    .then(res=>{})
                    .catch(err={})
                }else{
                    res.status(404).send("Student not in accepted list");
                }
            }
            if(status=="Accepted"){
                console.log(status)
                if(!flag){
                    jobTemplate.updateOne({_id:mongoose.Types.ObjectId(jobId)},{$push:{
                        accepted:enroll
                    }})
                    .then(res=>{})
                    .catch(err={})
                }else{
                    res.status(404).send("Student already accepted");
                }
            }
            if(status=="Rejected for interview"){
                console.log(status)
                if(!flag){
                    jobTemplate.updateOne({_id:mongoose.Types.ObjectId(jobId)},{$pull:{
                        applied:enroll
                    }})
                    .then(res=>{})
                    .catch(err={})
                }else{
                    res.status(404).send("Student already accepted");
                }
            }
        }
    })
})

app.post("/student_update", (req, res)=>{
    const {enroll, jobId, company, title}=req.body;
    var job=[];
    var applied=[];
    var flag1=0;
    var flag2=0;
    studentTemplate.find({registration:enroll}, (err, result)=>{
        if(err){
            res.status(404).send(err);
        }else{
            job=result[0].job;
            for(let i=0;i<job.length;i++){
                if(job[i].jobId==jobId && job[i].status!="Rejected for interview"){
                    flag1=1;
                    break;
                }
                else if(job[i].jobId==jobId && job[i].status==="Rejected for interview"){
                    flag2=1;
                    break;
                }
            }
            if(flag1===1){
                res.status(404).send("Already Applied");
            }else if(flag2){
                jobTemplate.find({_id:mongoose.Types.ObjectId(jobId)}, (err, result)=>{
                    if(err){
                        res.status(404).send(err);
                    }else{
                        applied=result[0].applied;
                        for(var i=0; i<job.length; i++){
                            if(job[i].jobId==jobId){
                                job[i].status='pending';
                            }
                        }
                        studentTemplate.updateOne({registration:enroll}, {$set:{"job":job}})
                        .then(res=>{
                        })
                        .catch(err=>{
                        })
                        applied.push(enroll);
                        jobTemplate.updateOne({_id:mongoose.Types.ObjectId(jobId)}, {$set:{"applied":applied}})
                        .then(res=>{
                        })
                        .catch(err=>{
                        })
                        console.log("Information updated in Student collection: "+job);
                        console.log("Information added in jobDetails collection: "+applied);
                        res.send("Reapplied successfully");
                    }
                })
            }else{
                jobTemplate.find({_id:mongoose.Types.ObjectId(jobId)}, (err, result)=>{
                    if(err){
                        res.status(404).send(err);
                    }else{
                        applied=result[0].applied;
                        job.push({jobId:jobId, company:company, title:title, status:'pending'});
                        studentTemplate.updateOne({registration:enroll}, {$set:{"job":job}})
                        .then(res=>{
                        })
                        .catch(err=>{
                        })
                        applied.push(enroll);
                        jobTemplate.updateOne({_id:mongoose.Types.ObjectId(jobId)}, {$set:{"applied":applied}})
                        .then(res=>{
                        })
                        .catch(err=>{
                        })
                        console.log("Information added in Student collection: "+job);
                        console.log("Information added in jobDetails collection: "+applied);
                        res.send("Applied successfully");
                    }
                })
            }
        }
    })
})

app.post('/students', (req, res)=>{
    Student.find({id:req.body.id}, (err, result)=>{
        if(err){
            res.status(404).send(err)
        }else{
            console.log(result.length)
            if(result.length!=0)
                res.status(200).send(result);
            else{
                res.status(404).send("Invalid Enroll id")
            }
        }
    })
})
app.post('/admin', (req, res)=>{
    Admin.find({id:req.body.id})
    .exec()
    .then(result=>{
        res.status(200).send("ok");
    }).catch(err=>{
        res.status(404).send("Invalid Institute Id Id");
    })
})
app.post("/checkAccount", (req, res)=>{
    StudentSignup.find({email:req.body.email}, (err, result)=>{
        if(err){
            res.status(404).send(err)
        }else{
            console.log(result.length)
            if(result.length==0)
                res.status(200).send(result);
            else{
                res.status(404).send("Email id already exist")
            }
        }
    })
})
app.post("/studentsSignUp", (req, res)=>{
    const student=new StudentSignup({
        email:req.body.email,
        password:req.body.password,
        id:req.body.id
    })
    student.save()
    .then(result=>{
        res.status(200).send('Successfully Registered');
    }).catch(err=>{
        res.status(404).send(err);
    })
})
app.post('/studentRegister', (req, res)=>{

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
    console.log(req.file, req.body)
    var finalImg = {
        contentType: req.file.mimetype,
        image:  Buffer.from(encode_image, 'base64')
    };

    const student=new studentTemplate({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact,
        registration:req.body.registration,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        pinCode:req.body.pinCode,
        country:req.body.country,
        course:req.body.course,
        batch:req.body.batch,
        cgpa:req.body.cgpa,
        rank:req.body.rank,
        marks12:req.body.marks12,
        marks10:req.body.marks10,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        boards12:req.body.boards12,
        boards10:req.body.boards10,
        resume:req.body.resume,
    });
    student.save()
    .then(result=>{
        res.json(result);
        console.log("data sent");
    })
    .catch(err=>{
        res.json(err);
        console.log('error');
    })
})

app.post('/studentUpdate', (req, res)=>{
    
    studentTemplate.updateOne({_id:req.body._id},{$set:{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact,
        registration:req.body.registration,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        pinCode:req.body.pinCode,
        country:req.body.country,
        course:req.body.course,
        batch:req.body.batch,
        cgpa:req.body.cgpa,
        rank:req.body.rank,
        marks12:req.body.marks12,
        marks10:req.body.marks10,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        boards12:req.body.boards12,
        boards10:req.body.boards10,
        resume:req.body.resume,
    }})

    .then(result=>{
        res.json(result);
        console.log("data updated");
    })
    .catch(err=>{
        res.json(err);
        console.log('error');
    })
})

app.post('/addJob',(req,res)=> {
    const job = new jobTemplate({
        jobTitle:req.body.jobTitle,
        companyName:req.body.companyName,
        location:req.body.location,
        workFromHome: req.body.workFromHome,
        startDate:req.body.startDate,
        applyBy:req.body.applyBy,
        salary:req.body.salary,
        companyRank:req.body.companyRank,
        companyDescription:req.body.companyDescription,
        jobDescription:req.body.jobDescription,
        eligibility:req.body.eligibility,
        noOfOpening:req.body.noOfOpening,
        perks:req.body.perks,
    });
    job.save()
    .then(result => {res.json(result);
        console.log("data sent");
    })
    .catch(err=>{
        res.json(err);
        console.log('error');
    })
})

app.post('/jobFeed', (req, res)=>{
    const {category, companyRank, location, workFromHome}=req.body;
    const query={};
    if(location!="")query["location"]=location;
    if(companyRank!="")query["companyRank"]=companyRank;
    if(category!="")query["jobTitle"]=category;
    query["workFromHome"]=workFromHome;
    console.log(query);
    jobTemplate.find(query, (err, result)=>{
        if(err){
                res.status(404).send(err);
        }else{
            console.log(result.length);
            if(result.length!=0)
                res.status(200).send(result);
            else{
                res.status(404).send("No Result Found");
            }
        }
    })
})

app.post("/find_job", (req, res)=>{
    jobTemplate.find({_id:req.body.id}, (err, result)=>{
        if(err)res.status(404).send(err);
        else{
            if(result.length!=0){
                res.send(result[0]);
            }
        }
    })
})

var profileStorage = multer.diskStorage({
    destination: "./public/data/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + req.body.enrol + path.extname(file.originalname))
        console.log(req.body)
    }
})

var upload = multer({
    storage: profileStorage
})

app.post('/stats', upload.single('resume'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file, req.body)
   try {
    // res.send("Resume Uploded!");
    res.status(204).send()
    //res.redirect('/');
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});

// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_image = img.toString('base64');
//     // Define a JSONobject for the image attributes for saving to database
//     console.log(req.file, req.body)
//     var finalImg = {
//         contentType: req.file.mimetype,
//         image:  Buffer.from(encode_image, 'base64')
//     };

//     studentTemplate.create(finalImg, (err, result) => {
//         console.log(result)

//         if (err) return console.log(err)

//         console.log('saved to database')
//         res.status(204).send()       
//      })
// });





const Port=5000;
app.listen(Port, ()=>{
    console.log("Server is started");
})