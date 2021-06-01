import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import EduDetailsForm from './EduDetailsForm';
import Upload from './Upload';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Address address', 'Education details', 'Upload Resume'];




export default function StudentRegistration({path}) {

  const [update, setUpdate] = useState(false);
  const [present, setPresent] = useState(false);
  const [items, setItems] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    registration: '',
    address1: '',
    address2: '',
    city: '',
    local: '',
    pinCode: '',
    country: '',
    course: '',
    batch: '',
    cgpa: '',
    rank: '',
    startDate: '',
    endDate: '',
    marks12: '',
    marks10: '',
    boards12: '',
    boards10: '',
  });


  useEffect(()=>{
    const request = async () => {
      axios.post("http://localhost:5000/student_details",{path:path})
        .then(
          (result) => {
            // console.log(path)
            // console.log(result)
            if(result.data.length!=0){
              setItems(result.data[0])
              setPresent(true)
            }
            //console.log(items)
          }
        )
        .catch(e=>console.log(e))
    }
    request();
  },[])



  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm items={items} handleChange={handleChange}/>;
      case 1:
        return <EduDetailsForm items={items} handleChange={handleChange}/>;
      case 2:
        return <Upload path={path}/>;
      default:
        throw new Error('Unknown step');
    }
    
  }

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const handleChange = (event) => {
    //console.log(event.target.name+" "+event.target.value)
    // console.log(items)
    // console.log(setItems)
    setUpdate(true);
    setItems({ ...(items), [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/studentRegister', items)
    .then(function (response) {
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleUpdate = () => {
    axios.post('http://localhost:5000/studentUpdate', items)
    .then(function (response) {
      //console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  const handleClick = () => {
    handleNext();
    // console.log(activeStep);
    // console.log(steps.length);
    if(activeStep==2){
      //console.log(details);
      
      if(update&&present) handleUpdate()
      else if (!present&&update) handleSubmit() 
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
    
     {/* {console.log(items)} */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Student Registration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you.
                </Typography>
                <Typography variant="subtitle1">
                  You have been successfully registered.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}