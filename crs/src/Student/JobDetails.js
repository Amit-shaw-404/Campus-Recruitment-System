import StudentAppbar from './studentAppBar';
import {Paper, Typography, Button, Divider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import WorkIcon from '@material-ui/icons/Work';

const useStyles=makeStyles({
  root:{
    backgroundColor:'#fff',
  },
  container:{
    display:'flex',
    justifyContent:'center',
    marginTop:'70px',
    marginBottom:'30px'
  },
  paper:{
    width:"60%",
    boxSizing:'border-box',
    padding:'20px'
  },
  main:{
    width:'60%'
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
export default function JobDetails(){
  const classes=useStyles();
  return (
    <div className={classes.root}>
      <StudentAppbar/>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.main}>
            <Typography variant="h6">Front end development</Typography>
            <p style={{color:'grey', margin:'10px 0'}}>Microsoft</p>
            <div className={classes.location}>
              <LocationOnIcon style={{fontSize:'22px', color:'grey'}}/>
              <p>Delhi, Gurgaon</p>
            </div>
            <div className={classes.details}>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <PlayCircleOutlineIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Start date</p>
                </div>
                <p>Immediately</p>
              </div>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <WorkIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Salary</p>
                </div>
                <p>10 lpa</p>
              </div>
              <div>
                <div style={{display:'flex', color:'grey'}}>
                <HourglassFullIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
                <p>Apply by</p>
                </div>
                <p style={{textAlign:'center'}}>20 May '21'</p>
              </div>
            </div>
          </div>
          <Divider/>
            <div className={classes.companyDetails}>
              <h2>About Company</h2>
              <p style={{margin:'20px 0'}}>
                Our sole aim at MentorBoxx is to bridge the gap between universities & industries. We select 30 students every month to regularly interact with the right industry experts, work on live industry projects, and grasp as much as industrial knowledge possible.
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>About Job</h3>
              <p style={{margin:'20px 0'}}>
              Key responsibilities:
              <br/><br/>
              <p>1. Handle a team of 30 interns to complete day-to-day marketing activities</p>
              <p>2. Ensure that the marketing campaigns result in traction on the platform</p>
              <p>3. Set up a team of ambassadors in colleges all across India</p>
              <p>4. Ensure the targets by the interns are completed on a daily basis</p>
              <p>5. Manage a team for social media marketing, on-ground marketing, and sales</p>
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>Skill(s) Required</h3>
              <p style={{margin:'20px 0'}}>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                  <span className={classes.skills}>Html</span>
                  <span className={classes.skills}>Css</span>
                  <span className={classes.skills}>JavaScript</span>
                  <span className={classes.skills}>ReactJs</span>
                </div>
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>Who can apply</h3>
              <p style={{margin:'20px 0'}}>
                1. Candidates with past experience in marketing, advertising, business development & sales will be preferred
              </p>
            </div>
            <div className={classes.companyDetails}>
              <h3>Number of openings</h3>
              <p style={{margin:'10px'}}>4</p>
            </div>
            <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
              <Button className={classes.applyButton}>
                Apply Now
              </Button>
            </div>
        </Paper>
      </div>
    </div>
  );
}
