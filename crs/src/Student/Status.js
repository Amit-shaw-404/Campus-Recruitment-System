import { Paper } from "@material-ui/core";
import axios from "axios"
import { useEffect, useState } from "react"
import './table.css'

export default function Status({id}){
    const [details, setDetails]=useState([]);
    useEffect(()=>{
        const request=async()=>{
            const data=await axios.post("http://localhost:5000/student_details", {path:id})
            .then(res=>{
                var arr=res.data[0].job;
                console.log(arr);
                arr.reverse();
                setDetails(arr);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        request();
    }, []);
    return(
        <div style={{display:'flex', justifyContent:'center', }}>
        <Paper style={{width:'60%', marginTop:'150px', display:'flex', justifyContent:'center'}}>
            <table>
                {/* <thead>
                    <tr>
                        <th>Company name</th>
                        <th>Job Title</th>
                        <th>Status</th>
                    </tr>
                </thead> */}
                <tbody>
                    {details.map((item) => 
                        <tr key={item.jobId}>
                            <td style={{ textAlign: "center" }}>
                                <h3>{item.company}</h3>
                            </td>
                            <td>
                                <div>
                                    <h3>{item.title}</h3>
                                </div>
                            </td>
                            <td>
                                <p>{item.status}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Paper>
        </div>
    )
}