import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
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


export default function Upload({items, handleChange}) {
  const classes = useStyles();

  

  return (
    <div style={{height:"50vh"}}>
      <Typography variant="h5" gutterBottom>
        Resume
      </Typography>
      
      <p>Upload resume on google drive, dropbox or any other cloud service and put the link below.</p>
      <TextField
            required
            id="resume"
            name="resume"
            label="Link to Resume"
            value = {items.resume}
            fullWidth
            onChange={handleChange}
      />
      
      
    </div>
  );
}