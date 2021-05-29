import {Paper, Typography, Button, Divider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import WorkIcon from '@material-ui/icons/Work';
import AppliedStudent from './AppliedStudent';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router';
import { useEffect, useState } from 'react';

const useStyles=makeStyles({
  root:{
    backgroundColor:'#f5f5f5',
  },
  container:{
    display:'flex',
    justifyContent:'center',
  },
  paper:{
    width:"100%",
    boxSizing:'border-box',
    padding:'20px',
    boxShadow:"0 0 0"
  },
  main:{
    width:'80%'
  },
  location:{
    display:'flex',
    margin:'30px 0 10px 0',
  },
  details:{
    display:'flex',
    justifyContent:"space-between",
    margin:'30px 0',
  },
  companyDetails:{
    margin:'20px 0'
  },
  skills:{
    padding:'5px 20px',
    margin:'0 10px',
    backgroundColor:'#F2F2F2',
    borderRadius:'10px'
  },
  applyButton:{
    padding:'10px 20px',
    backgroundColor:'#00A5EC',
    color:'#fff',
    "&:hover":{
      backgroundColor:'#00A5EC',
    }
  }
})
const JobDetails=({isAdmin, id})=>{
  const [details, setDetails]=useState({});
  const history=useHistory();
  const enroll=history.location.pathname.replace("/", "");
  const classes=useStyles();
  useEffect(()=>{
    const request=async()=>{
      const data=await axios.post("http://localhost:5000/find_job", {id:id})
      .then(res=>{
        setDetails(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    request();
  },[])
  const handleSubmit=async()=>{
    await axios.post("http://localhost:5000/student_update", {enroll:enroll, jobId:details._id, company:details.companyName, title:details.jobTitle})
    .then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.main}>
            <Typography variant="h6">{details.jobTitle}</Typography>
            <p style={{color:'grey', margin:'10px 0'}}>{details.companyName}</p>
            <div className={classes.location}>
              <LocationOnIcon style={{fontSize:'22px', color:'grey'}}/>
              <p>{details.workFromHome?"Work From Home":details.location}</p>
            </div>
            <div className={classes.details}>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <PlayCircleOutlineIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Start date</p>
                </div>
                <p>{details.startDate}</p>
              </div>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <WorkIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Salary</p>
                </div>
                <p>{details.salary} LPA</p>
              </div>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <HourglassFullIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Apply by</p>
                </div>
                <p style={{textAlign:'center'}}>{details.applyBy}</p>
              </div>
            </div>
          </div>
          <Divider/>
            <div className={classes.companyDetails}>
              <h2>About Company</h2>
              <p style={{margin:'20px 0'}}>
                {details.companyDescription}
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>About Job</h3>
              <p style={{margin:'20px 0'}}>
                {details.jobDescription}
              </p>
            </div>
            {/* <div className={classes.companyDetails}>
              <h3>Skill(s) Required</h3>
              <p style={{margin:'20px 0'}}>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                  <span className={classes.skills}>Html</span>
                  <span className={classes.skills}>Css</span>
                  <span className={classes.skills}>JavaScript</span>
                  <span className={classes.skills}>ReactJs</span>
                </div>
              </p>
            </div> */}
            <div className={classes.companyDetails}>
              <h3>Who can apply</h3>
              <p style={{margin:'20px 0'}}>
                {details.eligibility}
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>Number of openings</h3>
              <p style={{margin:'10px'}}>{details.noOfOpening}</p>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
              {isAdmin?"":
              <Button className={classes.applyButton} onClick={handleSubmit}>
                Apply Now
              </Button>
              }
            </div>
        </Paper>
      </div>
        {isAdmin?
        <>
          <AppliedStudent/>
          <AppliedStudent/>
          <AppliedStudent/>
          <AppliedStudent/>
          <AppliedStudent/>
        </>
        :""
        }
    </div>
  );
}

export default withRouter(JobDetails);
