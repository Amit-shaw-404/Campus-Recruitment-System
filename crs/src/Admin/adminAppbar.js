import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import '../App.css';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily:'Libre Baskerville',
    fontSize:'1.8rem'
  },
  appbar: {
    backgroundColor: '#fff',
    color: '#000',
    height:'90px',
    display:'flex',
    width:'100%',
    justifyContent:'center',
  },
  list:{
    fontFamily:'lato',
    fontSize:'1.1rem',
    fontWeight:'600',
    padding:'0 20px'
  }
}));


export default function AdminAppbar({setSelected}) {
  const classes = useStyles();

  return (
    <React.Fragment>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title}>
              Campus Recruitment System
            </Typography>
            {/* <Button color="inherit" onClick={()=>setSelected(2)}>Statistics</Button> */}
            
            <Button color="inherit" onClick={()=>setSelected(0)} className={classes.list}>Add Job</Button>
            <Button color="inherit" onClick={()=>setSelected(1)} className={classes.list}>Job Feed</Button>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}
