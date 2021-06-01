import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter, Redirect, Switch, withRouter} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import SignIn from "../components/SignIn";

import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#f8f8f8',
    minHeight:'100vh'
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
    width:'80%',
    marginTop:theme.spacing(10),
    marginBottom:theme.spacing(10),

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
  const [showerr, setShowerr]=useState(false);
  const {history}=props;

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
          {/* <AppBar position="static" className={classes.appbar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Campus Recruitment System
              </Typography>
              <Button color="inherit" >Login</Button>
              <Button color="inherit">Statistics</Button>
            </Toolbar>
          </AppBar> */}
          <Container >
          <Grid container>
            <Grid item xs={7}>
              <div className={classes.front}>
                <h2>IIESTs Campus Recruitment</h2>
                <p>Join in to apply for placements</p>
              </div>
            </Grid>
            <Grid item xs={5}>
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
          </Grid>
          </Container>
        </div>
      }
    </>
  );
}

export default withRouter(Homepage);