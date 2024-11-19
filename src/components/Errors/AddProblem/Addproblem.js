import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import './Addproblem.css'
export default function Addproblem({close}) {
    return (
        <div className='addError-container'>
            <h3 style={{textAlign:'center'}}>Új probléma hozzáadása</h3>
            <FormControl fullWidth className='addError-form'>

                    
                     
                <TextField name='todo_text'  id="outlined-basic" label="Név" variant="outlined" />
                <TextField name='todo_text'  id="outlined-basic" label="Leírás" variant="outlined" />
                <DatePicker name='expire_at' label="Dátum" />



                <Stack spacing={40} direction="row">
                        <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                        <Button variant="contained">Mentés</Button>
                </Stack>

            </FormControl>


        </div>
    )
}