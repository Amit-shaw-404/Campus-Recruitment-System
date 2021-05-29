import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import JobFeed from './JobFeed';
import StudentAppbar from './studentAppBar';
import StudentRegisterMain from './Register/studentRegisterMain';
import { useHistory, withRouter } from 'react-router';

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

const StudentDashboard=()=>{
    const classes = useStyles();
    const [access, setAccess]=useState(false);
    const [selected, setSelected]=useState(0);
    const [msg, setMsg]=useState("Please wait, loading...")
    const history=useHistory();
    const path=history.location.pathname.replace("/","");
    useEffect(()=>{
        const request=async()=>{
            axios.get("http://localhost:5000/student_home", {
                headers:{
                    "x-access-token":localStorage.getItem(`token${path}`),
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
            <>
                <StudentAppbar setSelected={setSelected}/>
                (
                    {selected===0&&<StudentRegisterMain/>}
                    {selected===1&&<JobFeed isAdmin={false}/>}
                )
            </>
        }
        </>
    );
}

export default withRouter(StudentDashboard);