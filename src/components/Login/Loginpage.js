import './Loginpage.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Loginpage() {
    const [usersList,setUsersList] = useState([]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        const user = usersList.find(u => u.username === data.username && u.password === data.password);
        if (user) {
            navigate("/home")
        } else {
            alert("sikertelen")
        }
    }
    
    useEffect(()=>{
        axios.get("http://localhost:8080/api/user").then((response)=>{
            const userss = response.data;
            setUsersList(userss);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <div className="login-container center">
            <h2 style={{textAlign:'center'}}>Belépés</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth style={{gap:'40px'}}>
            <TextField id="outlined-basic" label="Username" variant="outlined" {...register("username",{required:true})}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' {...register("password",{required:true})} />
            {errors.username && console.log("rq") }
            {errors.password && console.log("rq") }
            <Button type='submit' variant="contained" className='login-button'>Login</Button>
            </FormControl>  
            </form>
        </div>
    )
}   