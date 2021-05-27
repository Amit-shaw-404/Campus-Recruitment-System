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
    const student=new studentTemplate({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contactno,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        local:req.body.state,
        pinCode:req.body.zip,
        country:req.body.country,
        course:req.body.course,
        batch:req.body.batch,
        cgpa:req.body.averagecgpa,
        rank:req.body.rank,
        marks12:req.body.marks12,
        marks10:req.body.marks10,
        startDate:req.body.startDate,
        applyBy:req.body.applyBy,
        boards12:req.body.boards12,
        boards10:req.body.boards10,
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

app.post('/addJob',(req,res)=> {
    const job = new jobTemplate({
        jobTitle:req.body.jobTitle,
        companyName:req.body.companyName,
        location:req.body.location,
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


const Port=5000;
app.listen(Port, ()=>{
    console.log("Server is started");
})