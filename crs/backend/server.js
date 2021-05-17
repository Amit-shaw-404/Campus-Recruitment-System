const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const studentSignUp = require('./models/studentSignUp');

dotenv.config();

//Connecting mongodb
mongoose.connect(process.env.Database_access, ()=>console.log("database connected"));

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send("Hello there");
})
app.post("/students/signup", (req, res)=>{
    const user=new studentSignUp({
        email:req.body.email,
        enroll:req.body.enroll,
        password:req.body.password,
    })
    user.save()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json(err);
    })
})
app.post('/students', (req, res)=>{
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
        rank:req.body.country,
        highMarks:req.body.country,
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

const Port=80;
app.listen(Port, ()=>{
    console.log("Server is started");
})