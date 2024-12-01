import './WorkerDetails.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function WorkerDetails(close) {
    return (
        <div className='workerdetails_container'>
        <h3 style={{textAlign:'center'}}>Dolgozó információ</h3>
        <FormControl fullWidth className='worker_form'>

                
                 
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" />
            <TextField  name='description'  id="outlined-basic" label="Leírás" variant="outlined" />



            <Stack spacing={40} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained">Mentés</Button>
            </Stack>

        </FormControl>


    </div>
    )
}