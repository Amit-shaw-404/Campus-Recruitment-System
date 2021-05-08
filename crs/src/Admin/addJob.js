import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "../App.css";
import { MenuItem, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'#f8f8f8',
  },
  dashboard:{
    display:'flex',
    backgroundColor:'#f8f8f8',
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
      label: 'Type A',
    },
    {
        value: 'B',
        label: 'Type B',
      },
      {
        value: 'C',
        label: 'Type C',
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

  const classes=useStyles();
  return(
    <div className={classes.root} >
    
    <div className={classes.dashboard}>
      
      <Grid container className={classes.container}>
        <Paper>
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
                <TextField className={classes.textField} id="start-date" label="Start Date" variant="outlined"/>
                <TextField className={classes.textField} id="salary" label="Salary in LPA" variant="outlined" 
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        ₹
                        </InputAdornment>
                    ),
                }}/>
                <TextField className={classes.textField} id="apply-by" label="Apply By" variant="outlined"/>
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
        </Paper>
      </Grid>
    </div>
    </div>
  );
}
