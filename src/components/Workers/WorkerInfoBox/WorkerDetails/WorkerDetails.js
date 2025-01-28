import './WorkerDetails.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import { useContext } from 'react';
import {MenuItem,Select } from '@mui/material';
import { Update } from '@mui/icons-material';
import { WorkerContext } from '../../../../contexts/WorkerProvider';
import { useForm } from 'react-hook-form';

export default function WorkerDetails({close,worker}) {
    let {roles} = useContext(RoleContext)
    let {updateWorker,getWorkers} = useContext(WorkerContext)
            const {
                register,
                handleSubmit,
                watch,
                formState: { errors },
            } = useForm()
    const onSubmit = (data) => {
        updateWorker(worker.workerId,data);
        getWorkers();
        close();
    }
    return (
        <div className='modalworker'>
        <h3 style={{textAlign:'center'}}>Dolgozó információ</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth className='worker_form'> 
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" defaultValue={worker.name} {...register("name",{required:true})} />
            <Select
    labelId="demo-simple-select"
    id="demo-simple-select"
    defaultValue={worker.title} 
    {...register("title",{required:true})}
>   
    <MenuItem value="" disabled>Beosztás kiválasztása</MenuItem>
    {roles.map((role) => (
        <MenuItem key={role.roleName} value={role.roleDescription}>
            {role.roleDescription}
        </MenuItem>
    ))}
</Select>
            <TextField  name='phonenumber'  id="outlined-basic" label="Telefonszám" variant="outlined" defaultValue={worker.phoneNumber} {...register("phoneNumber",{required:true})}/>
            <TextField  name='email'  id="outlined-basic" label="E-mail" variant="outlined" defaultValue={worker.email} {...register("email",{required:true})}/>
            <TextField  name='wage'  id="outlined-basic" label="Fizetés" variant="outlined" defaultValue={worker.wage} {...register("wage",{required:true})}/>



            <Stack spacing={40} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained" type='submit'>Mentés</Button>
            </Stack>

        </FormControl>
        </form>
    </div>
    )
}