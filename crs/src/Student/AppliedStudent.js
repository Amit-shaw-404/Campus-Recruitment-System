import { Button, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function AppliedStudent({id}){
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
        <Button>Resume</Button>
        <select className={classes.select}>
            <option>Accept</option>
            <option>Reject</option>
        </select>
      </CardActions>
    </Card>
    );
}