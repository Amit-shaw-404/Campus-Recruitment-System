import { Avatar, Grid, makeStyles, Paper } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import JobFeed from './JobFeed';
import StudentAppbar from './studentAppBar';
import StudentRegisterMain from './Register/studentRegisterMain';
import { useHistory, withRouter } from 'react-router';
import Status from './Status';

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
    // const [items, setItems] = useState({
    //     firstName: '',
    //     lastName: '',
    //     contact: '',
    //     registration: '',
    //     address1: '',
    //     address2: '',
    //     city: '',
    //     local: '',
    //     pinCode: '',
    //     country: '',
    //     course: '',
    //     batch: '',
    //     cgpa: '',
    //     rank: '',
    //     marks12: '',
    //     marks10: '',
    //     startDate: '',
    //     applyBy: '',
    //     boards12: '',
    //     boards10: '',
    // });
    
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
                //console.log(path);
                // axios.post("http://localhost:5000/student_details",{path:path})
                //     .then(
                //         (result) => {
                //             //console.log(result)
                //             if(result.data.length!=0)
                //                 setItems(result.data[0])
                //             //console.log(items)
                //         }
                //     )
                //     .catch(e=>console.log(e))
                setAccess(true);
            }).catch(err=>{
                setMsg("Session expired, please login again!");
            })
        }
        request();
    }, [])
    return(
        <div style={{backgroundColor:'#f8f8f8'}}>
        {!access?
            <div className={classes.greet}>
                <h1>{msg}</h1>
            </div>
            :
            <>
                <StudentAppbar setSelected={setSelected}/>
                {selected===0&&<StudentRegisterMain path={path}/>}
                {selected===1&&<JobFeed/>}
                {selected===2&&<Status id={path}/>}
            </>
        }
        </div>
    );
}

export default withRouter(StudentDashboard);