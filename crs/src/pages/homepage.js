import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import JobFeed from "../Student/JobFeed";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#f8f8f8',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    margin: '50px 20px 50px 20px',
  },
  appbar: {
    backgroundColor: '#fff',
    color: '#000'
  },
  signin:{
    width:'100%',
    marginTop:theme.spacing(10),
  },
  front:{
    width:'100%',
    marginTop:theme.spacing(10),
  }
}));

export default function Homepage() {
  const classes = useStyles();
  const [flag, setFlag] = useState(0);
  const [signup, setSignup] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Campus Recruitment System
          </Typography>
          <Button color="inherit" >Login</Button>
          <Button color="inherit">Statistics</Button>
        </Toolbar>
      </AppBar>
      <JobFeed/>
      // <Container >
      // <Grid container>
      //   <Grid item xs={8}>
      //     <div className={classes.front}>
      //       <h2>IIESTs Campus Recruitment</h2>
      //       <p>Join in to apply for placements</p>
      //     </div>
      //   </Grid>
      //   <Grid item xs={4}>
      //     <div className={classes.signin}>
      //       {signup ? (
      //         <SignUp flag={flag} setFlag={setFlag} setSignUp={setSignup}/>
      //         ) : (
      //         <SignIn flag={flag} setFlag={setFlag} setSignUp={setSignup} />
      //       )}
      //     </div>
      //   </Grid>
      // </Grid>
      // </Container>
    </div>
  );
}
