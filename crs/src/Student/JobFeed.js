import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import FilterListIcon from '@material-ui/icons/FilterList';
import {FormControlLabel, MenuItem, TextField} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import StudentAppbar from './studentAppBar';
import "../App.css"
import JobFeedComponent from './JobFeedComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'#f8f8f8',
  },
  dashboard:{
    display:'flex',
    backgroundColor:'#f8f8f8',
    justifyContent:'center',
    marginTop:theme.spacing(15),
    width:'100%'
  },
  container:{
    width:'80%',
    // border:'1px solid black'
  },
  filter:{
    width:'100%',
    marginRight:'20px'
  },
  filterTitle:{
    display:'flex',
    justifyContent:'center',
    textAlign:"center",
    padding:'5px 0',
  },
  feed:{
    width:'100%',
    marginLeft:'20px'
  },
  input:{
    margin:'0 20px 10px',
    '& input':{
      padding:'10px 10px',
      outline:'none',
      width:'80%',
      border:'1px solid gray',
      borderRadius:'5px'
    },
    '& select':{
      backgroundColor: '#fff',
      padding:'10px 10px',
      outline:'none',
      width:'80%',
      border:'1px solid gray',
      borderRadius:'5px'
    },
  }
}));

export default function JobFeed(){

  const [filter, setFilter] = useState({
    category:'Business Analyst',
    workFromHome:false,
    location:'Gurgaon',
    salary:'C',
  });

  const [details, setDetails] = useState([{
        jobTitle:"",
        companyName:"",
        location:"",
        workFromHome:false,
        startDate:"",
        applyBy:"",
        salary:"",
        companyRank:"",
        companyDescription:"",
        jobDescription:"",
        eligibility:"",
        noOfOpening:"",
        perks:"",
  }]);
  const handleChange = (event) => {
    event.preventDefault();
    if(event.target.name==="workFromHome"){
      console.log(event.target.name)
      setFilter({...filter, [event.target.name]: event.target.checked })
    }
    else{
      setFilter({...filter, [event.target.name]: event.target.value });
    }
    console.log(filter);
  };

  useEffect(() => {
    const id = setTimeout(()=>{
      const request=async()=>{
        const data=await axios.post('http://localhost:5000/jobFeed', filter)
        .then(result=>{
          console.log(result);
          setDetails(result.data);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      request();
    },3000)
    return () => {
      clearTimeout(id);
    }
  }, [filter])

  const classes=useStyles();
  return(
    <div className={classes.root} >
    <StudentAppbar />
    <div className={classes.dashboard}>
      
      <Grid container className={classes.container}>
        <Grid item xs={12} md={4} className={classes.filter}>
          <Paper>
            <div className={classes.filterTitle}>
              <FilterListIcon/>
              <h4 style={{margin:'0 5px'}}>Filters</h4>
            </div>
            <div className={classes.input}>
              <p style={{margin:'0 0 10px 0'}}>Category</p>
              <select name="category" id="Category" value={filter.category} onChange={handleChange}>
                  {category.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{display:'flex', margin:'20px 50px 5px 20px', justifyContent:'space-between'}}>
              <p>Work from home</p>
              <FormControlLabel
                control={
                  <Switch
                    name="workFromHome"
                    color="primary"
                    onChange={handleChange}
                  />
                }/>
            </div>
            {
              !(filter.workFromHome)
              ? <div className={classes.input}>
                <p style={{margin:'0 0 10px 0'}}>Location</p>
                <select name="location" id="Location" value={filter.location} onChange={handleChange}>
                    {place.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                </div>
              : <div className={classes.input}>
                <p style={{margin:'0 0 10px 0'}}>Location</p>
                <select name="location" id="Location" value="" onChange={handleChange} disabled>
                  {/* {place.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                </select>
                </div>
            }
            
            <div className={classes.input}>
              <p style={{margin:'0 0 10px 0'}}>Salary</p>
              <select
               name="salary"
               id="salary" 
               style={{margin:'0 0 50px 0'}} 
               value={filter.salary}
               onChange={handleChange}
              >
                  {ranks.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} className={classes.feed}>
            {
              details.map((item, index)=>(
              <div key={index}>
                <JobFeedComponent item={item}/>
              </div>
              ))
            }
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

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
const category = [
    {
      value: 'Full Stack Developer',
      label: 'Full Stack Developer',
    },
    {
      value: 'Machine Learning Engineer',
      label: 'Machine Learning Engineer',
    },
    {
      value: 'Front End Developer',
      label: 'Front End Developer',
    },
    {
      value: 'Backend Developer',
      label: 'Backend Developer',
    },
    {
      value: 'Business Analyst',
      label: 'Business Analyst',
    },
    {
      value: 'Android App Developer',
      label: 'Android App Developer',
    },
    {
      value: 'Data Scientist',
      label: 'Data Scientist',
    },
];
const place = [
  {
    value: 'Kolkata',
    label: 'Kolkata',
  },
  {
    value: 'Delhi',
    label: 'Delhi',
  },
  {
    value: 'Mumbai',
    label: 'Mumbai',
  },
  {
    value: 'Bangalore',
    label: 'Bangalore',
  },
  {
    value: 'Chennai',
    label: 'Chennai',
  },
  {
    value: 'Hyderabad',
    label: 'Hyderabad',
  },
  {
    value: 'Gurgaon',
    label: 'Gurgaon',
  },
];
