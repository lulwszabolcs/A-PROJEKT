import styles from './Loginpage.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SnackbarContent } from '@mui/material';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
export default function Loginpage() {
    let { SnackbarMessage, SnackbarOpen, closeSnackbar, SnackbarSuccess,displaySnackbar } = useContext(SnackbarContext);
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
            displaySnackbar("Sikertelen bejelentkezés!",false)
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
        <div className={styles.logincontainer}>
            <div className={styles.loginform}>
            <h2 style={{textAlign:'center'}}>Belépés</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth style={{gap:'40px'}}>
            <TextField id="outlined-basic" label="Felhasználónév" variant="outlined" required {...register("username",{required:true})}/>
            <TextField id="outlined-basic" label="Jelszó" variant="outlined" type='password' required {...register("password",{required:true})} />
            <Button type='submit' variant="contained" className={styles.loginbutton}>Login</Button>
            </FormControl>  
            </form>
            </div>
            <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
        </div>

    )
}   