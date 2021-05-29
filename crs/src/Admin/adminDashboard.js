import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import JobFeed from "../Student/JobFeed";
import AdminAppbar from './adminAppbar';
import AddJob from "./addJob";


export default function AdminDashboard(){
    const [access, setAccess]=useState(false);
    const [msg, setMsg]=useState("Please wait, loading...")
    const [selected, setSelected]=useState(0);
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
        <div style={{backgroundColor:"#f8f8f8", minHeight:'100vh'}}>
            {!access?
            <div style={{
                display:'flex', 
                width:'100vw', 
                height:'100vh', 
                justifyContent:'center', 
                alignItems:'center'
            }}
            >
            <h1>{msg}</h1>
            </div>
            :
            <>
                <AdminAppbar setSelected={setSelected}/>
                {selected===0&&<AddJob/>}
                {selected===1&&<JobFeed isAdmin={true}/>}
            </>
            }
        </div>
    )
}