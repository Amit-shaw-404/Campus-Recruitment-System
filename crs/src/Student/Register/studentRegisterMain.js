import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core';
import StudentAppbar from '../studentAppBar';
import StudentRegistration from './studentRegistration';

const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
    },
    container:{
        display:"block",
        width:"80%",
        margin: "0 auto",
    },
    avatar: {
      margin: '20px 0px',
      width: '90%',
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoUpload: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
    }
  }));

const StudentRegisterMain=()=>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <StudentAppbar/>
            <div className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} className={classes.photoUpload}>
                        <Paper>
                            <div style={{display:'flex',justifyContent: 'center',alignItems: 'center',}}>
                                <Avatar variant="rounded" alt="Remy Sharp" className={classes.avatar} src="https://qph.fs.quoracdn.net/main-qimg-99edf6c9b901fd291b7910ea0bbe8811" />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <StudentRegistration/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default StudentRegisterMain;