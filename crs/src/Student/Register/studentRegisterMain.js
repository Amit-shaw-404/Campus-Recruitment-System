import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core';
import StudentRegistration from './studentRegistration';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:"100%",
    },
    container:{
        width:"60%",
    },
    avatar: {
      margin: '20px 0px',
      width: '90%',
      height: 'auto',
    },
    photoUpload: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
    },
  }));

const StudentRegisterMain=({path})=>{
    const classes = useStyles();
    //console.log(items)
    
    return(
    <div className={classes.root}>
        <div className={classes.container}>
            <Grid container spacing={4}>
              <Grid Grid item xs={12} sm={3} className={classes.photoUpload}>
                  <Paper>
                      <div style={{display:'flex',justifyContent: 'center',alignItems: 'center',}}>
                          <Avatar variant="rounded" alt="Remy Sharp" className={classes.avatar} src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" />
                          
                      </div>
                  </Paper>
              </Grid>
              <Grid item xs={12} sm={9}>
                  <StudentRegistration path={path}/>
              </Grid>
          </Grid>
        </div>
    </div>
    );
}

export default StudentRegisterMain;