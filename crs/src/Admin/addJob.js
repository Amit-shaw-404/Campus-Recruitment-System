import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "../App.css";
import { MenuItem, InputAdornment, Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import category from '../List_Files/jobType.json';
import place from '../List_Files/location.json'


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
  },
  selectField:{
    margin:'10px',
    border:'1px solid #B8B8B8',
    padding:'20px 10px',
    borderRadius:'5px',
    fontSize:'14px',  
  },
  option:{
    fontSize:'14px',
    color:"#000"
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
        workFromHome: false,
        companyName:"",
        startDate: Date('2022-01-01T21:11:54'),
        applyBy: Date('2022-01-01T21:11:54'),
        companyRank: 'A',
        companyDescription:'',
        applyBy:'',
        noOfOpening:'',
        eligibility:'',
        perks:'',
        jobDescription:'',
        salary:'',
        applied:[]
      });
    
      const handleChange = (event) => {
        console.log(event.target)
        if(event.target.name==="workFromHome"){
          setState({...state, [event.target.name]: event.target.checked })
        }
        else{
          setState({ ...state, [event.target.name]: event.target.value });
        }  
      };

      const handleSubmit = (event) => {
          console.log(state);
          event.preventDefault();
          axios.post('http://localhost:5000/addJob', state)
          .then(function (response) {
            setState({
              workFromHome: false,
              companyName:"",
              startDate: Date('2022-01-01T21:11:54'),
              applyBy: Date('2022-01-01T21:11:54'),
              companyRank: 'A',
              companyDescription:'',
              applyBy:'',
              noOfOpening:'',
              eligibility:'',
              perks:'',
              jobDescription:'',
              salary:'',
              applied:[]
            })
            alert("Job Added");
          })
          .catch(function(err){
            console.log(err);
          })
      }


  const classes=useStyles();
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
        <div className={classes.root} >
        <div className={classes.dashboard}>
          
          <Grid container className={classes.container}>
            <Paper>
                <div style={{margin:'20px'}}>
                  <h2>Add Job Opening</h2>
                </div>
                <form onSubmit={handleSubmit}>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <select className={classes.selectField} style={{width:"100%"}} name="jobTitle" onChange={handleChange} required>
                      {category.map((item,index)=>(
                        <option className={classes.option} key={index}>{item.label}</option>
                      ))}
                    </select>
                    <TextField className={classes.textField} required value={state.companyName} id="company-name" name="companyName" label="Company Name" onChange={handleChange} variant="outlined" fullWidth/>                
                </Grid>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <FormControlLabel
                        style={{margin:'10px', justifyContent:'center'}}
                        control={<Switch value={state.workFromHome} onChange={handleChange} name="workFromHome" color="primary"/>}
                        label="Work from Home"
                    />
                    {
                      !state.workFromHome
                      ?
                        <select className={classes.selectField} style={{width:"22%"}} name="location" onChange={handleChange} required>
                          {place.map((item,index)=>(
                            <option className={classes.option} key={index}>{item.label}</option>
                          ))}
                        </select>
                      : <TextField disabled className={classes.textField} required id="location" name="location" label="Location" onChange={handleChange} variant="outlined"
                      />
                    }
                </Grid>
                <div style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
                      <Grid
                        item
                        xs={5}
                        style={{margin:"10px 10px 15px 0"}}
                      >                      
                        <TextField
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        name="startDate"
                        label="Start Date*"
                        value={state.startDate}
                        onChange={handleChange}
                        fullWidth
                        className={classes.date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      </Grid>
                      <Grid
                       item
                       xs={5}
                       style={{margin:"10px 15px 15px 0"}}
                      >
                        <TextField
                          id="date"
                          type="date"
                          defaultValue="2017-05-24"
                          name="applyBy"
                          label="Apply By*"
                          value={state.applyBy}
                          onChange={handleChange}
                          fullWidth
                          className={classes.date}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    
                    
                </div>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                    <TextField className={classes.textField} id="salary" value={state.salary} required name="salary" label="Salary in LPA" variant="outlined" onChange={handleChange}
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
                        required
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
                    required
                    label="About the Company"
                    multiline
                    value={state.companyDescription}
                    rows={5}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    required
                    id="job-description"
                    name="jobDescription"
                    label="About the Job"
                    value={state.jobDescription}
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    required
                    id="eligibility"
                    name="eligibility"
                    label="Eligibility"
                    value={state.eligibility}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    required
                    id="no-of-opening"
                    name="noOfOpening"
                    label="Number of Openings"
                    value={state.noOfOpening}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    />
                    <TextField
                    className={classes.textField}
                    required
                    id="perks"
                    name="perks"
                    value={state.perks}
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
                  <Button variant="contained" type="submit" color="primary">
                    Submit
                  </Button>
                </Grid>
              
                </form>
  
            </Paper>
          </Grid>
        </div>
        </div>

    </MuiPickersUtilsProvider>
      );
}
