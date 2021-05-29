import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import FilterListIcon from '@material-ui/icons/FilterList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {FormControlLabel, IconButton} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {CircularProgress} from '@material-ui/core';


import category from "../List_Files/jobType.json"
import place from "../List_Files/location.json"

import JobFeedComponent from './JobFeedComponent';
import JobDetails from './JobDetails';

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

export default function JobFeed({isAdmin}){

  const [filter, setFilter] = useState({
    category:'',
    workFromHome:false,
    location:'',
    companyRank:'',
  });
  const [isLoading, setIsLoading]=useState(true);
  const [err, setErr]=useState(false);
  const [id, setId]=useState("1");

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
      if(event.target.checked)
      setFilter({...filter, [event.target.name]: event.target.checked, ["location"]:'' })
      else
      setFilter({...filter, [event.target.name]: event.target.checked});
    }
    else{
      setFilter({...filter, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setErr(false);
    const id = setTimeout(()=>{
      const request=async()=>{
        const data=await axios.post('http://localhost:5000/jobFeed', filter)
        .then(result=>{
          setIsLoading(false);
          setErr(false);
          setDetails(result.data);
        })
        .catch(err=>{
          setIsLoading(false);
          setErr(true);
        })
      }
      request();
    },3000)
    return () => {
      clearTimeout(id);
    }
  }, [filter])

  const classes=useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (job_id) => {
    setId(job_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div className={classes.root} >
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
                  <option value="">All</option>
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
                  <option value="" defaultValue>All</option>
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
                </select>
                </div>
            }
            
            <div className={classes.input}>
              <p style={{margin:'0 0 10px 0'}}>Salary</p>
              <select
               name="companyRank"
               id="salary" 
               style={{margin:'0 0 50px 0'}} 
               value={filter.salary}
               onChange={handleChange}
              >
                <option value="" defaultValue>All</option>
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
          {isLoading?
            <div style={{width:'100%', height:'50%', display:'flex', justifyContent:'center', alignItems:'center' }}>
              <div>
                <CircularProgress style={{marginLeft:'25px'}}/>
                <h2 style={{margin:'15px 0'}}>Searching...</h2>
              </div>
            </div>
            :
            (err?
              <div style={{width:'100%', height:'50%', display:'flex', justifyContent:'center', alignItems:'center' }}>
                <h2>No result found :(</h2>
              </div>
              :
              details.map((item, index)=>(
              <div key={index}>
                <JobFeedComponent handleClick={handleClickOpen} item={item}/>
              </div>
              ))
            )
          }
        </Grid>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
            <h2>Details</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon/>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <JobDetails isAdmin={isAdmin} id={id}/>
        </DialogContent>
      </Dialog>
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
