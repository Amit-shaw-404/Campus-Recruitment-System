import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#fff',
    color: '#000'
  },
}));


export default function AdminAppbar({setSelected}) {
  const classes = useStyles();

  return (
    <React.Fragment>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Campus Recruitment System - Admin Panel
            </Typography>
            <Button color="inherit" onClick={()=>setSelected(2)}>Statistics</Button>
            <Button color="inherit" onClick={()=>setSelected(0)}>Add Job</Button>
            <Button color="inherit" onClick={()=>setSelected(1)}>Job Feed</Button>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}
