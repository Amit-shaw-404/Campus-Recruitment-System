import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter, Redirect, Switch, withRouter} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import heroImg from '../homepage_img.svg'
import security from '../security.svg'


import SignIn from "../components/SignIn";
import  '../App.css';

import axios from 'axios';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#f5f5f5',
    minHeight:'90vh',
    //backgroundImage: bgImg,
    //backgroundImage: `url('https://image.freepik.com/free-vector/geometric-shapes-background_23-2148923275.jpg')`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily:'Libre Baskerville',
    fontSize:'2rem'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    margin: '50px 20px 50px 20px',
  },
  appbar: {
    //backgroundColor: '#fff',
    color: '#000',
    padding:'10px 20px',
    boxSizing:'border-box',
  },
  signin:{
    width:'80%',
    marginTop:theme.spacing(10),
    marginBottom:theme.spacing(10),

  },
  front:{
    width:'100%',
    marginTop:theme.spacing(10),
  },
  list:{
    fontFamily:'lato',
    fontSize:'1.1rem',
    fontWeight:'600',
    padding:'0 20px'
  }
}));

const Homepage = (props) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(0);
  const [cred, setCred]=useState({});
  const [details, setDetails]=useState({signIn:false, Id:true})
  const [showerr, setShowerr]=useState(false);
  const {history}=props;

  function handleScrollToLogin  () {
    window.scrollTo({
        top: 550,
        behavior: 'smooth' 
    })
  }

  const handleSubmit=(event)=>{
    event.preventDefault(); 
    console.log(flag);
    if(!flag) {
      axios.post("http://localhost:5000/student_signIn", cred)
      .then(result=>{
        localStorage.setItem(`token${result.data.user[0].id}`, result.data.token);
        history.push(`/${result.data.user[0].id}`);
        setDetails({signIn:true, Id:result.data.user[0].id});
      })
      .catch(err=>{
        setShowerr(true);
      })
    }else{
      axios.post("http://localhost:5000/admin_signIn", cred)
      .then(result=>{
        localStorage.setItem("token", result.data.token);
        history.push(`/admin`);
        setDetails({signIn:true});
      })
      .catch(err=>{
        setShowerr(true);
      })
    }
  }

  return (
    <>
      {details.signIn?
        <BrowserRouter>
          <Switch>
            {
              details.id===0?
              <Redirect from="/" to={`/admin`}/>
              :
              <Redirect from="/" to={`/${details.id}`}/>
            }
            
          </Switch>
        </BrowserRouter>
        :
        <div className={classes.root}>
          <AppBar color="transparent" elevation={0} position="static" className={classes.appbar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Campus Recruitment System
              </Typography>
              <Button className={classes.list} color="secondary" size="large" onClick={handleScrollToLogin}>Login</Button>
              <Button className={classes.list} color="secondary" size="large">Statistics</Button>
            </Toolbar>
          </AppBar>
          <Container >
          <Grid container
          style={{minHeight:'80vh'}}
          direction="row"
          justify="center"
          alignItems="center" >
            <Grid item xs={6}>
              <div className={classes.front}>
                <img style={{width:'20%'}} src={'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/IIEST_Shibpur_Logo.svg/1200px-IIEST_Shibpur_Logo.svg.png' }></img>
                <h1 style={{fontSize:'50px'}} >IIESTs Campus</h1><h1 style={{fontSize:'50px',color:'#faa146'}}> Recruitment</h1>
                <p style={{fontSize:'30px'}}>Join in to apply for placements</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="hero_img" style={{marginTop:'50px'}} >
                <img src={heroImg} alt="campus recruitment system"></img>
              </div>
            </Grid>
          </Grid>
          <Grid container
          style={{minHeight:'80vh'}}
          direction="row"
          justify="center"
          alignItems="center" >
            <Grid xs={5}>
                <Paper className={classes.signin}>
                  <SignIn 
                    flag={flag} 
                    setFlag={setFlag} 
                    cred={cred} 
                    setCred={setCred} 
                    handleSubmit={handleSubmit}
                    showerr={showerr}
                    setShowerr={setShowerr}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4} style={{margin:'0 10%'}}>
                <img width="100%" src={security}></img>
              </Grid>
            </Grid>
          </Container>
        </div>
      }
    </>
  );
}

export default withRouter(Homepage);