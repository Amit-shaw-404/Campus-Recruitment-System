import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import pdf from '../../uploads/resume_510819030.pdf'

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  Input: {

  }
}));


export default function Upload({path}) {
  const classes = useStyles();

  

  return (
    <div style={{height:"50vh"}}>
      <Typography variant="h5" gutterBottom>
        Resume
      </Typography>
      

      {/* <Grid >
        <input type="file" accept=".pdf" className={classes.Input}/>
        <Button variant="contained" color="primary">Upload</Button>
      </Grid> */}

      <form action="http://localhost:5000/stats" enctype="multipart/form-data" method="post" onsubmit="event.preventDefault();">
        <div class="form-group">
          <input value={path} name="enrol" type="hidden"></input>
          <input type="file" class="form-control-file" name="resume" />
          <Button type="submit" variant="contained" color="primary">Upload</Button>
        </div>
      </form>

      <a href={'/510819030/'+require('../../uploads/resume_510819030.pdf')} target="/510819030/">Download Pdf</a>
      {console.log(require('../../uploads/resume_510819030.pdf'))}

      {/* <a onClick={() => window.open(require('../../uploads/resume_510819030.pdf'))}>
          Review Resume
      </a> */}
      
      
    </div>
  );
}