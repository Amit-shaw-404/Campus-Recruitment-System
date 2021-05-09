import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

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

export default function Upload() {
  const classes = useStyles();

  return (
    <div style={{height:"50vh"}}>
      <Typography variant="h5" gutterBottom>
        Resume
      </Typography>

      <Grid >
        <input type="file" accept=".pdf" className={classes.Input}/>
        <Button variant="contained" color="primary">Upload</Button>
      </Grid>
      
    </div>
  );
}