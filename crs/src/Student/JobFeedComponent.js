import Paper from '@material-ui/core/Paper'
import {Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import WorkIcon from '@material-ui/icons/Work';

import "../App.css";

const useStyles = makeStyles((theme) => ({
  paper:{
    width:'100%',
    padding:'20px',
    boxSizing:'border-box',
    marginBottom:'30px'
  },
  location:{
    display:'flex',
    margin:'30px 0 10px 0',
  },
  details:{
    display:'flex',
    justifyContent:"space-between",
    margin:'30px 0',
  }
}));
export default function JobFeedComponent(props){
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">{props.item.jobTitle}</Typography>
      <p style={{color:'grey', margin:'10px 0'}}>{props.item.companyName}</p>
      <div className={classes.location}>
        <LocationOnIcon style={{fontSize:'22px', color:'grey'}}/>
        <p>{props.item.workFromHome?"Work From Home":props.item.location}</p>
      </div>
      <div className={classes.details}>
        <div>
          <div style={{display:'flex', color:'grey'}}>
          <PlayCircleOutlineIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
          <p>Start date</p>
          </div>
          <p>{props.item.startDate}</p>
        </div>
        <div>
          <div style={{display:'flex', color:'grey'}}>
          <WorkIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
          <p>Salary</p>
          </div>
          <p>{props.item.salary} LPA</p>
        </div>
        <div>
          <div style={{display:'flex', color:'grey'}}>
          <HourglassFullIcon style={{fontSize:'22px', color:'grey', margin:'0 5px 5px 5px'}}/>
          <p>Apply by</p>
          </div>
          <p style={{textAlign:'center'}}>{props.item.applyBy}</p>
        </div>
      </div>
      <Button color="primary" onClick={()=>props.handleClick(props.item._id)}>
        details
      </Button>
    </Paper>
  );
}
