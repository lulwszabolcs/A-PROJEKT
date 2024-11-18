import './Loginpage.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

export default function Loginpage() {
    return (
        <div className="login-container center">
            <h2 style={{textAlign:'center'}}>Belépés</h2>
            <FormControl fullWidth style={{gap:'40px'}}>
            <TextField id="outlined-basic" label="Username" variant="outlined"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Button variant="contained" className='login-button'>Login</Button>
            </FormControl>
        </div>
    )
}   