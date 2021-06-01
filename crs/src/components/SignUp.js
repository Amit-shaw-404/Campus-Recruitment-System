import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import heroImg from '../homepage_img.svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    width:"100%",
  },
  nav: {
    backgroundColor: "#f8f8ff",
    marginBottom: "20px"
  },
  active: {
    backgroundColor: "#fff",
    zIndex: "2"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(4, 0, 6)
  },
  link:{
    textDecoration:'underline',
    color:'blue',
    fontSize:'20px',
    padding:'5px',
    cursor:'pointer',
    marginBottom:"30px"
  }
}));
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);
export default function SignUp() {
  const classes = useStyles();
  const [flag, setFlag]=useState(0);
  const [eerr, setEerr]=useState("");
  const [iderr, setIderr]=useState("");
  const [details, setDetails]=useState({});
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    signUpRequest();
  }
  const handleChange=(event)=>{
    setEerr("");
    setIderr("");
    setDetails({ ...details, [event.target.name]: event.target.value });
  }
  const signUpRequest=()=>{
    handleClickOpen();
    axios.post("http://localhost:5000/students", details)
    .then(res=>{
      axios.post("http://localhost:5000/checkAccount", details)
      .then( result=>{
        axios.post("http://localhost:5000/studentsSignUp", details)
        .then(response=>{
          setSuccess("Accound have been successfuly created, please try logging in.")
          handleClose();
        }).catch(err=>{
          handleClose();
        })
      })
      .catch(err=>{
        setEerr("Email id already exist");
        handleClose();
      })
    })
    .catch(err=>{
      handleClose();
      setIderr("Invalid enrollment id");
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{display:'flex', justifyContent:"center", height:'100vh', alignItems:'center'}}>
      <Grid item xs={6}>
              <div className="hero_img" style={{marginTop:'50px', marginRight:'50px'}} >
                <img src={heroImg} alt="campus recruitment system"></img>
              </div>
      </Grid>
      {success!==""?
        <Typography variant="h5">{success}</Typography>
        :
        <Paper style={{width:'25%'}}>
        <div className={classes.paper}>
          <Dialog aria-labelledby="customized-dialog-title" open={open}>
            <DialogContent dividers>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0 10px 0"
                }}
              >
                <CircularProgress />
              </div>
              <Typography variant="h5" gutterBottom>
                please wait...
              </Typography>
           </DialogContent>
          </Dialog>
          <Grid container className={classes.nav}>
            <Grid
              item
              xs={6}
              style={{ padding: "15px 0", cursor: "pointer" }}
              className={!flag ? classes.active : null}
            >
              <div
                onClick={() => {
                  if (flag) setFlag(!flag);
                }}
              >
                <Typography component="h1" variant="h5" align="center">
                  Student
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ padding: "15px 0", cursor: "pointer" }}
              className={flag ? classes.active : null}
            >
              <div
                onClick={() => {
                  if (!flag) setFlag(!flag);
                }}
              >
                <Typography component="h1" variant="h5" align="center">
                  Admin
                </Typography>
              </div>
            </Grid>
          </Grid>
          <form className={classes.form} onSubmit={(e)=>handleSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>handleChange(e)}
              autoFocus
            />
            {eerr!==""?(<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{eerr}</p>):""}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Id"
              label={!flag?"Enroll Id":"Institute Id"}
              name="id"
              onChange={(e)=>handleChange(e)}
            />
            {iderr!==""?(<p style={{color:'#F32013', margin:'5px 0', fontSize:'13px'}}>{iderr}</p>):""}
            <TextField  
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>handleChange(e)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Paper>
      }
    </div>
  );
}
