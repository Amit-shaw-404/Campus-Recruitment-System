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


export default function StudentAppbar({setSelected}) {
  const classes = useStyles();

  return (
    <React.Fragment>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Campus Recruitment System
            </Typography>
            <Button className={classes.list} color="inherit" onClick={()=>setSelected(0)}>Register</Button>
            <Button className={classes.list} color="inherit" onClick={()=>setSelected(1)}>Job Feed</Button>
            <Button className={classes.list} color="inherit" onClick={()=>setSelected(2)}>Status</Button>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}
