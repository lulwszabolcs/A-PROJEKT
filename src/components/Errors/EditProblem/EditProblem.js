import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import './EditProblem.css';
export default function EditProblem({close,problem}) {
    return (
        <div className='editProblem-container'>
            <h3 style={{textAlign:'center'}}>Probléma szerkesztése</h3>
            <FormControl fullWidth className='editError-form'>

                    
                     
                <TextField defaultValue={problem.name} name='todo_text'  id="outlined-basic" label="Név" variant="outlined" />
                <TextField defaultValue={problem.desc} name='todo_text'  id="outlined-basic" label="Leírás" variant="outlined" />
                <DatePicker name='expire_at' label="Dátum" />



                <Stack spacing={40} direction="row">
                        <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                        <Button variant="contained">Mentés</Button>
                </Stack>

            </FormControl>


        </div>
    )
}