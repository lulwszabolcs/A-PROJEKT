import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import './VehicleModify.module.css'
import { useContext, useEffect, useState } from 'react';
import {MenuItem,Select } from '@mui/material';
import { useForm } from "react-hook-form"
import { TypeContext } from '../../../contexts/TypeProvider';
import { VehicleContext } from '../../../contexts/VehicleProvider';
export default function VehicleModify({close}) {
    let {vehicleStatuses} = useContext(TypeContext);
    let {vehicles} = useContext(VehicleContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
            <div className='modifyvehicle-container'>
                <h3 style={{textAlign:'center'}}>Jármű állapot változtatása</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth className='modifyvehicle-form'>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        name='problemType'
                        defaultValue={'tpus'}
                        {...register("license")}
                        >
                        <MenuItem value={'tpus'} disabled>Jármű kiválasztása</MenuItem>
                        {vehicles.map((vehicle) => (
                            <MenuItem key={vehicle.license} value={vehicle.vehicleId}>
                                {vehicle.license}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        name='problemType'
                        defaultValue={'tpus'}
                        {...register("status")}
                        >
                        <MenuItem value={'tpus'} disabled>Állapot kiválasztása</MenuItem>
                        {vehicleStatuses.map((status) => (
                            <MenuItem key={status.vehicleStatusDescription} value={status.vehicleStatusDescription}>
                                {status.vehicleStatusDescription}
                            </MenuItem>
                        ))}
                    </Select>
                    <Stack spacing={40} direction="row">
                            <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                            <Button variant="contained" type='submit'>Mentés</Button>
                    </Stack>
                </FormControl>
    </form>


            </div>
    )
}