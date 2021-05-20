import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import axios from 'axios';

export default function EduDetailsForm(props) {

  const [state,setState] = React.useState({
    course:"",
    batch:'',
    startDate:'',
    endDate:"",
    averagecgpa:'',
    rank:'',
    marks12:'',
    marks10:'',
    boards12:'',
    boards10:'',
  })

  const handleChange = (event) => {
    //console.log(event.target.name+" "+event.target.value)
    props.setData({ ...(props.data), [event.target.name]: event.target.value});
  };

  // const handleSubmit = () => {
  //   console.log(state);
  //   axios.post('http://localhost:5000/studentRegister', state)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   })
  // }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Education Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
        <FormControl style={{width:"100%"}}>
          <InputLabel id="Course-label">Select Current Course</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              name="course"
              label="Current course"
              onChange={handleChange}
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
        <FormControl style={{width:"100%"}}>
          <InputLabel id="Course-label">Select your batch</InputLabel>
            <Select
              labelId="batch-select-label"
              id="batch-select"
              label="Batch"
              name="batch"
              onChange={handleChange}
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="startdate"
            label="Start-date"
            type="date"
            name="startDate"
            onChange={handleChange}
            defaultValue="2017-07-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="enddate"
            label="End-date"
            type="date"
            name="endDate"
            onChange={handleChange}
            defaultValue="2021-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="AvgCGPA"
            name="averagecgpa"
            onChange={handleChange}
            label="Average CGPA"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ClassRank"
            name="rank"
            onChange={handleChange}
            label="Rank in class"
            fullWidth
          />
        </Grid> 
        <Grid item xs={12} sm={6}>
          <TextField id="standard-basic" name="marks12" onChange={handleChange} label="Class 12th marks(%)" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{width:"100%"}}>
            <InputLabel id="Boards12">Boards(10+2)</InputLabel>
              <Select
                id="Boards12select"
                name="boards12"
                onChange={handleChange}
              >
              <MenuItem value="CBSE">CBSE</MenuItem>
              <MenuItem value="ICSE">ICSE</MenuItem>
              <MenuItem value="State Boards">State Boards</MenuItem>
              </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField id="standard-basic" name="marks10" onChange={handleChange} label="Class 10th marks(%)" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{width:"100%"}}>
            <InputLabel id="Boards10">Boards(10th)</InputLabel>
              <Select
                id="Boards10select"
                name="boards10"
                onChange={handleChange}
              >
              <MenuItem value="CBSE">CBSE</MenuItem>
              <MenuItem value="ICSE">ICSE</MenuItem>
              <MenuItem value="State Boards">State Boards</MenuItem>
              </Select>
          </FormControl>
        </Grid>
        {/* <Button 
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Save
        </Button> */}
      </Grid>
    </React.Fragment>
  );
}