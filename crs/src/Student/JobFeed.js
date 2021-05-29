import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import FilterListIcon from '@material-ui/icons/FilterList';
import {FormControlLabel, IconButton} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';


import "../App.css"
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
    width:'60%',
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
  }
}));
export default function JobFeed({isAdmin}){
  const classes=useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
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
              <FormControlLabel
                style={{margin:'5px'}}
                value="end"
                control={<Checkbox color="primary" />}
                label="Show jobs as per my preferences"
                labelPlacement="end"
              />
              <div className={classes.input}>
                <p style={{margin:'0 0 10px 0'}}>Category</p>
                <input type="text" placeholder="eg: Web development"/>
              </div>
              <div className={classes.input}>
                <p style={{margin:'0 0 10px 0'}}>Location</p>
                <input type="text" placeholder="eg: Kolkata"/>
              </div>
              <div style={{display:'flex', margin:'10px 50px 5px 20px', justifyContent:'space-between'}}>
                <p>Work from home</p>
                <Switch
                  name="home"
                  color="primary"
                />
            </div>
            <div style={{display:'flex', margin:'5px 50px 5px 20px', justifyContent:'space-between'}}>
              <p>Part Time</p>
              <Switch
                name="part-time"
                color="primary"
              />
            </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} className={classes.feed}>
            <JobFeedComponent handleClick={handleClickOpen}/>
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
            <JobDetails isAdmin={isAdmin}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
