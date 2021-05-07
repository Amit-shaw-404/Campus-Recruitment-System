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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    height: '100vh',
    width: '100%'
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#fff',
    color: '#000'
  },
  dashboard: {
      margin: '20px'
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
      
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Campus Recruitment System
            </Typography>
            <Button color="inherit" >Profile</Button>
            <Button color="inherit">Edit Profile</Button>
            <Button color="inherit">Register</Button>
            <Button color="inherit">Job Feed</Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} className={classes.dashboard}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <div style={{display:'flex',justifyContent: 'center',alignItems: 'center',}}>
                <Avatar variant="rounded" alt="Remy Sharp" className={classes.avatar} src="https://pbs.twimg.com/profile_images/1383196364792680448/N8CdupEu_400x400.jpg" />
              </div>
            </Paper>
            
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography>Amber head</Typography>
            </Paper>
          </Grid>
        </Grid>
      

      </div>
          
    </React.Fragment>
  );
}
