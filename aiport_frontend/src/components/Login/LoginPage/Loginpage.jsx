import styles from './Loginpage.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import { UserContext } from '../../../contexts/UserProvider';
export default function Loginpage() {
    let { SnackbarMessage, SnackbarOpen, closeSnackbar, SnackbarSuccess,displaySnackbar } = useContext(SnackbarContext);
    let {userLogin} = useContext(UserContext);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = async (data) => {
        const isLoggedIn = await userLogin(data);
        if (isLoggedIn) {
            displaySnackbar("Sikeres bejelentkezés!", true);
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } else {
            displaySnackbar("Sikertelen bejelentkezés!", false);
        }
    };
    
    return (
        <div className={styles.logincontainer}>
            <div className={styles.loginform}>
            <h2 style={{textAlign:'center'}}>Belépés</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth style={{gap:'40px'}}>
                    <TextField id="outlined-basic" label="Felhasználónév" variant="outlined" defaultValue={"viccelek"} required {...register("username",{required:true})}/>
                    <TextField id="outlined-basic" label="Jelszó" variant="outlined" type='password' defaultValue={"viccelek123"} required {...register("password",{required:true})} />
                    <Button type='submit' variant="contained" className={styles.loginbutton} data-testid={"loginButton"}>Belépés</Button>
                </FormControl>  
            </form>
            </div>
            <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
        </div>

    )
}   