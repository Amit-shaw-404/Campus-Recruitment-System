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


const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'#f5f5f5',
  },
  dashboard:{
    display:'flex',
    backgroundColor:'#f5f5f5',
    justifyContent:'center',
    padding: '30px 0px',
    width:'100%'
  },
  container:{
    width:'60%',
    // border:'1px solid black'
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
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

      const [rank, setRank] = React.useState('A');

      const handleRankChange = (event) => {
          setRank(event.target.value);
      };

      const [selectedDate, setSelectedDate] = React.useState(new Date('2022-01-01T21:11:54'));

      const handleDateChange = (date) => {
        setSelectedDate(date);
      };

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
                    <TextField className={classes.textField} id="job-title" label="Job Title" variant="outlined" fullWidth/>
                    <TextField className={classes.textField} id="company-name" label="Company Name" variant="outlined" fullWidth/>                
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField disabled className={classes.textField} id="location" label="Location" variant="outlined"/>
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
                      label="Start Date"
                      value={selectedDate}
                      onChange={handleDateChange}
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
                      label="Apply By"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <TextField className={classes.textField} id="salary" label="Salary in LPA" variant="outlined" 
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
                        label="Company Rank"
                        variant="outlined"
                        value={rank}
                        onChange={handleRankChange}
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
                    label="About the Company"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    />
                    <TextField
                    className={classes.textField}
                    id="job-description"
                    label="About the Job"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    />
                    <TextField
                    className={classes.textField}
                    id="eligibility"
                    label="Eligibility"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    />
                    <TextField
                    className={classes.textField}
                    id="no-of-opening"
                    label="Number of Openings"
                    variant="outlined"
                    fullWidth
                    />
                    <TextField
                    className={classes.textField}
                    id="perks"
                    label="Perks"
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  style={{margin:'30px'}}
                >
                  <Button variant="contained" color="primary">
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
