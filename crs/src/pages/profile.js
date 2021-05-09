import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
<<<<<<< HEAD
import StudentAppbar from'../Student/studentAppBar';
=======
import StudentAppbar from '../Student/studentAppBar';
>>>>>>> 414af11c94faffbc8bdb9a4badfa73ae884852c5

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    height: '100vh',
    width: '100%'
  },
  dashboard: {
<<<<<<< HEAD
      margin: '20px',
      width: '75%'
=======
      display: "block",
      width: "75%",
      margin: '0 auto'
>>>>>>> 414af11c94faffbc8bdb9a4badfa73ae884852c5
  },
  avatar: {
    margin: '20px 0px',
    width: '90%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
      
<<<<<<< HEAD
        <StudentAppbar />
        <Grid container spacing={3} className={classes.dashboard} justify="center" >
          <Grid item xs={3}>
=======
        <StudentAppbar/>
        <div className={classes.dashboard}>
          <Grid container spacing={3} style={{marginTop: "50px"}}>
          <Grid item sm={3} xs={12}>
>>>>>>> 414af11c94faffbc8bdb9a4badfa73ae884852c5
            <Paper className={classes.paper}>
              <div style={{display:'flex',justifyContent: 'center',alignItems: 'center',}}>
                <Avatar variant="rounded" alt="Remy Sharp" className={classes.avatar} src="https://pbs.twimg.com/profile_images/1383196364792680448/N8CdupEu_400x400.jpg" />
              </div>
            </Paper>
            
          </Grid>
          <Grid item sm={8} xs={12}>
            <Paper className={classes.paper}>
              <Typography>Amber head</Typography>
            </Paper>
          </Grid>
        </Grid>
        </div>
      

      </div>
          
    </React.Fragment>
  );
}
