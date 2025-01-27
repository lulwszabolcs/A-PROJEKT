import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import styles from './AddVehicle.module.css'
import { useContext, useEffect, useState } from 'react';
import {MenuItem,Select, TextField } from '@mui/material';
import { useForm } from "react-hook-form"
import { TypeContext } from '../../../contexts/TypeProvider';
import { VehicleContext } from '../../../contexts/VehicleProvider';
export default function AddVehicle({close}) {
    let {vehicleTypes} = useContext(TypeContext);
    let {addVehicle,getVehicles} = useContext(VehicleContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => {
        data.status = "Működőképes"
        data.vehicleYear = Number(data.vehicleYear)
        addVehicle(data);
        close();
    }
    return (
            <div className={styles.addvehiclecontainer}>
                <h3 style={{textAlign:'center'}}>Jármű hozzáadása</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth className={styles.addvehicleform}>
                    <TextField name='name'  id="outlined-basic" label="Név" variant="outlined" {...register("name",{required:true})} />
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        name='problemType'
                        defaultValue={'tpus'}
                        {...register("type")}
                        >
                        <MenuItem value={'tpus'} disabled>Típus kiválasztása</MenuItem>
                        {vehicleTypes.map((type) => (
                            <MenuItem key={type.vehicleTypeDescription} value={type.vehicleTypeDescription}>
                                {type.vehicleTypeDescription}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField name='year' type="number"  id="outlined-basic" label="Évjárat" variant="outlined" {...register("vehicleYear",{required:true})} />
                    <Stack spacing={40} direction="row">
                            <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                            <Button variant="contained" type='submit'>Mentés</Button>
                    </Stack>
                </FormControl>
                </form>
            </div>
    )
}