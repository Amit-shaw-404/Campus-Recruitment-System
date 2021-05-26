import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
    },
    greet:{
        display:'flex', 
        width:'100vw', 
        height:'100vh', 
        justifyContent:'center', 
        alignItems:'center'
    }
  }));

const StudentRegisterMain=()=>{
    const classes = useStyles();
    const [access, setAccess]=useState(false);
    const [msg, setMsg]=useState("Please wait, loading...")
    useEffect(()=>{
        const request=async()=>{
            axios.get("http://localhost:5000/student_home", {
                headers:{
                    "x-access-token":localStorage.getItem("token"),
                }
            }).then(res=>{
                setAccess(true);
            }).catch(err=>{
                setMsg("Session expired, please login again!");
            })
        }
        request();
    }, [])
    return(
        <>
        {!access?
            <div className={classes.greet}>
                <h1>{msg}</h1>
            </div>
            :
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
            }
        </>
    );
}

export default StudentRegisterMain;