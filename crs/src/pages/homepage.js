import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter, Redirect, Switch, withRouter} from 'react-router-dom';
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
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#f8f8f8',
    height:'100vh'
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

const Homepage = (props) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(0);
  const [cred, setCred]=useState({});
  const [details, setDetails]=useState({signIn:false, Id:true})
  const {history}=props;

  const handleSubmit=(event)=>{
    event.preventDefault();  
    axios.post("http://localhost:5000/signIn", cred)
    .then(result=>{
      localStorage.setItem("token", result.data.token);
      history.push(`/${result.data.user[0].id}`);
      setDetails({signIn:true, Id:result.data.user[0].id});
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
      {details.signIn?
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to={`/${details.id}`}/>
          </Switch>
        </BrowserRouter>
        :
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
          <Container >
          <Grid container>
            <Grid item xs={8}>
              <div className={classes.front}>
                <h2>IIESTs Campus Recruitment</h2>
                <p>Join in to apply for placements</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.signin}>
                <SignIn flag={flag} setFlag={setFlag} cred={cred} setCred={setCred} handleSubmit={handleSubmit}/>
              </Paper>
            </Grid>
          </Grid>
          </Container>
        </div>
      }
    </>
  );
}

export default withRouter(Homepage);
