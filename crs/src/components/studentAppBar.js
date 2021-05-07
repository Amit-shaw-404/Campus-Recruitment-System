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


export default function StudentAppbar() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Campus Recruitment System
            </Typography>
            <Button color="inherit" >Profile</Button>
            <Button color="inherit">Edit Profile</Button>
            <Button color="inherit">Register</Button>
            <Button color="inherit">Job Feed</Button>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}
