const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const jobTemplate=require('./models/jobDescription');
const studentTemplate=require('./models/studentRegister');
dotenv.config();

//Connecting mongodb
mongoose.connect(process.env.Database_access, ()=>console.log("database connected"));

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send("Hello there");
})
app.post('/studentRegister', (req, res)=>{
    const student=new studentTemplate({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        local:req.body.local,
        pinCode:req.body.pinCode,
        country:req.body.country,
        course:req.body.course,
        batch:req.body.batch,
        cgpa:req.body.cgpa,
        rank:req.body.rank,
        highMarks:req.body.highMarks,
        boardMarks:req.body.boardMarks,
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

const Port=80;
app.listen(Port, ()=>{
    console.log("Server is started");
})