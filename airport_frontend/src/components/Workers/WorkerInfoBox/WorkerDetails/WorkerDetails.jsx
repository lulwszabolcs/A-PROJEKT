import styles from './WorkerDetails.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import { useContext, useEffect } from 'react';
import {MenuItem,Select } from '@mui/material';
import { WorkerContext } from '../../../../contexts/WorkerProvider';
import { useForm } from 'react-hook-form';

export default function WorkerDetails({close,worker,canEditWorker}) {
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
        <div className={styles.modalworker}>
        <h3 className={styles.detailstitle}>Dolgozó információ</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth className={styles.workerform}> 
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" defaultValue={worker.name} slotProps={{input: {readOnly:!canEditWorker}}} {...register("name",{required:true})} />
        <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                defaultValue={worker.title} 
                slotProps={{input: {readOnly:!canEditWorker}}}
                {...register("title",{required:true})}
            >   
            <MenuItem value="" disabled>Beosztás kiválasztása</MenuItem>
            {roles.map((role) => (
                <MenuItem key={role.roleName} value={role.roleDescription}>
                    {role.roleDescription}
                </MenuItem>
            ))}
        </Select>
            <TextField  name='phonenumber'  id="outlined-basic" label="Telefonszám" variant="outlined" slotProps={{input: {readOnly:!canEditWorker}}} defaultValue={worker.phoneNumber} {...register("phoneNumber",{required:true})}/>
            <TextField  name='email'  id="outlined-basic" label="E-mail" variant="outlined" slotProps={{input: {readOnly:!canEditWorker}}} defaultValue={worker.email} {...register("email",{required:true})}/>
            <TextField  name='wage'  id="outlined-basic" label="Fizetés" variant="outlined" slotProps={{input: {readOnly:!canEditWorker}}} defaultValue={worker.wage} {...register("wage",{required:true})}/>
            <Stack className={styles.buttons} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    {canEditWorker &&
                    <Button variant="contained" type='submit'>Mentés</Button>
                    }
            </Stack>
        </FormControl>
        </form>
    </div>
    )
}