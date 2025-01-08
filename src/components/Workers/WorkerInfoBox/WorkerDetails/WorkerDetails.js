import './WorkerDetails.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function WorkerDetails({close}) {
    return (
        <div className='modalworker'>
        <h3 style={{textAlign:'center'}}>Dolgozó információ</h3>
        <FormControl fullWidth className='worker_form'>

                
                 
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" />
            <TextField  name='title'  id="outlined-basic" label="Beosztás" variant="outlined" />
            <TextField  name='phonenumber'  id="outlined-basic" label="Telefonszám" variant="outlined" />
            <TextField  name='email'  id="outlined-basic" label="E-mail" variant="outlined" />
            <TextField  name='wage'  id="outlined-basic" label="Fizetés" variant="outlined" />



            <Stack spacing={40} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained">Mentés</Button>
            </Stack>

        </FormControl>


    </div>
    )
}