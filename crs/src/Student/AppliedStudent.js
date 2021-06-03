import { Button, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
      marginBottom:'10px',
    },
    select:{
        padding:'5px 10px',
        margin:'0 10px',
    }
}));

export default function AppliedStudent({id, jobId}){
    console.log(id);
    const classes=useStyles();
    const [details, setDetails]=useState({
      firstName:'',
      lastName:'',
      contact:'',
      cgpa:'',
      rank:'',
      batch:'',
      course:'',
    });
    useEffect(()=>{
      const request=async()=>{
        const data=await axios.post('http://localhost:5000/student_details', {path:id})
        .then(result=>{
          setDetails(result.data[0]);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      request();
    }, [])
    const [appStatus, setAppStatus] = useState({status:"pending", jobId:jobId, studentId:id});
    const handleApplication = (event)=>{
      setAppStatus({...appStatus,[event.target.name]:event.target.value});
      console.log(appStatus);
    }
    useEffect(()=>{
      const id= setTimeout(()=>{
        const request=async()=>{
          const data = await axios.post('http://localhost:5000/applicationStatus', appStatus)
          .then(result=>{
            console.log("Changes made")
          })
          .catch(err=>{
            console.log("bye")
            console.log(err);
          })
        }
        request();
      },3000)
      return () => {
        clearTimeout(id);
      }
    },[appStatus])

    
    return(
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={`${details.firstName} ${details.lastName}`}
        subheader={`${details.course} Batch-${details.batch}`}
      />
      <CardContent>
        <p>
          GPA : {details.cgpa}, Rank : {details.rank}, Contact : {details.contact}
        </p>
      </CardContent>
      <CardActions disableSpacing>
      <a href={details.resume} style={{textDecoration:'none'}} target="_blank"><Button variant="containes">Resume</Button></a>
        <select className={classes.status} name="status" value={appStatus.status} onChange={handleApplication}>
            <option value="Application submitted">Application submitted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected for interview">Selected for interview</option>
            <option value="Rejected for interview">Rejected for interview</option>
        </select>
      </CardActions>
    </Card>
    );
}