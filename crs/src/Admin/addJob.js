import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "../App.css";
import { MenuItem, InputAdornment, Typography, Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AdminAppbar from './adminAppbar';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'#f5f5f5',
  },
  dashboard:{
    display:'flex',
    backgroundColor:'#f5f5f5',
    justifyContent:'center',
    padding: '30px 0px',
    width:'100%',
  },
  container:{
    width:'60%',
    // border:'1px solid black',
  },
  textField: {
      margin: '10px',
  }
}));

const ranks = [
    {
      value: 'A',
      label: 'Type A [18 LPA+]',
    },
    {
        value: 'B',
        label: 'Type B [8-18 LPA]',
      },
      {
        value: 'C',
        label: 'Type C [4-8 LPA]',
      },
  ];
  


export default function AddJob(){

    const [state, setState] = React.useState({
        workFromHome: true,
        startDate: Date('2022-01-01T21:11:54'),
        applyBy: Date('2022-01-01T21:11:54'),
        companyRank: 'A',
      });
    
      const handleChange = (event) => {
        console.log(event.target.name+" "+event.target.value)
        setState({ ...state, [event.target.name]: event.target.value });
      };

      const handleSubmit = () => {
          console.log(state);
          axios.post('http://localhost:5000/addJob', state)
          .then(function (response) {
            console.log(response);
          })
          .catch(function(err){
            console.log(err);
          })
      }

      // const [rank, setRank] = React.useState('A');

      // const handleRankChange = (event) => {
      //     setRank(event.target.value);
      // };

      // const [selectedDate, setSelectedDate] = React.useState(new Date('2022-01-01T21:11:54'));

      // const handleDateChange = (date) => {
      //   setSelectedDate(date);
      // };

  const classes=useStyles();
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
        <div className={classes.root} >
        <AdminAppbar/>
        <div className={classes.dashboard}>
          
          <Grid container className={classes.container}>
            <Paper>
                <div style={{margin:'20px'}}>
                  <h2>Add Job Opening</h2>
                </div>
                
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField className={classes.textField} id="job-title" name="jobTitle" label="Job Title" onChange={handleChange} variant="outlined" fullWidth/>
                    <TextField className={classes.textField} id="company-name" name="companyName" label="Company Name" onChange={handleChange} variant="outlined" fullWidth/>                
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField className={classes.textField} id="location" name="location" label="Location" onChange={handleChange} variant="outlined"/>
                    {/* <TextField className={classes.textField} id="location" label="Location" variant="outlined"/> */}
                    <FormControlLabel
                        style={{margin:'10px', justifyContent:'center'}}
                        control={<Switch checked={state.workFromHome} onChange={handleChange} name="workFromHome" color="primary"/>}
                        label="Work from Home"
                    />
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    
                    <KeyboardDatePicker
                      disableToolbar
                      className={classes.textField}
                      variant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="start-date"
                      name="startDate"
                      label="Start Date"
                      value={state.startDate}
                      onChange={handleChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      className={classes.textField}
                      variant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="apply-by"
                      name="applyBy"
                      label="Apply By"
                      value={state.applyBy}
                      onChange={handleChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <TextField className={classes.textField} id="salary" name="salary" label="Salary in LPA" variant="outlined" onChange={handleChange}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            ₹
                            </InputAdornment>
                        ),
                    }}/>
                    
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField
                        className={classes.textField}
                        id="company-rank"
                        select
                        name="companyRank"
                        label="Company Rank"
                        variant="outlined"
                        value={state.companyRank}
                        onChange={handleChange}
                        >
                        {ranks.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField
                    className={classes.textField}
                    id="company-description"
                    name="companyDescription"
                    label="About the Company"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    id="job-description"
                    name="jobDescription"
                    label="About the Job"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    id="eligibility"
                    name="eligibility"
                    label="Eligibility"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    id="no-of-opening"
                    name="noOfOpening"
                    label="Number of Openings"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    id="perks"
                    name="perks"
                    label="Perks"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  style={{margin:'30px'}}
                >
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
                
            </Paper>
          </Grid>
        </div>
        </div>

    </MuiPickersUtilsProvider>
      );
}
