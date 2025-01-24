import './WorkerDetails.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import { useContext } from 'react';
import {MenuItem,Select } from '@mui/material';

export default function WorkerDetails({close,worker}) {
    let {roles} = useContext(RoleContext)
    return (
        // ha nem hr a role readonly, fizetés kell???, ha a role hr editelhessen, image megcsinálás
        <div className='modalworker'>
        <h3 style={{textAlign:'center'}}>Dolgozó információ</h3>
        <FormControl fullWidth className='worker_form'>

                
                 
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" defaultValue={worker.name} />
            <Select
    labelId="demo-simple-select"
    id="demo-simple-select"
    defaultValue={worker.title} 
    name='title'
>   
    <MenuItem value="" disabled>Beosztás kiválasztása</MenuItem>
    {roles.map((role) => (
        <MenuItem key={role.roleName} value={role.roleDescription}>
            {role.roleDescription}
        </MenuItem>
    ))}
</Select>
            <TextField  name='phonenumber'  id="outlined-basic" label="Telefonszám" variant="outlined" defaultValue={worker.phoneNumber}/>
            <TextField  name='email'  id="outlined-basic" label="E-mail" variant="outlined" defaultValue={worker.email}/>
            <TextField  name='wage'  id="outlined-basic" label="Fizetés" variant="outlined" defaultValue={worker.wage}/>



            <Stack spacing={40} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained">Mentés</Button>
            </Stack>

        </FormControl>


    </div>
    )
}