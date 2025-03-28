import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './VehicleModify.module.css'
import { useContext } from 'react';
import {MenuItem,Select } from '@mui/material';
import { useForm } from "react-hook-form"
import { TypeContext } from '../../../contexts/TypeProvider';
import { VehicleContext } from '../../../contexts/VehicleProvider';
import { UserContext } from '../../../contexts/UserProvider';

export default function VehicleModify({close}) {
    let {vehicleStatuses} = useContext(TypeContext);
    let {vehicles,modifyVehicle} = useContext(VehicleContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        console.log(data)
        await modifyVehicle(data.id, data.value);
        close();
      };
    return (
            <div className={styles.modifyvehiclecontainer}>
                <h3 className={styles.modifyVehicleTitle}>Jármű állapot változtatása</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth className={styles.modifyvehicleform}>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        name='problemType'
                        defaultValue={'tpus'}
                        {...register("id")}
                        >
                        <MenuItem value={'tpus'} disabled>Jármű kiválasztása</MenuItem>
                        {vehicles.sort((a,b)=>(a.license.localeCompare(b.license))).map((vehicle) => (
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
                        {...register("value")}
                        >
                        <MenuItem value={'tpus'} disabled>Állapot kiválasztása</MenuItem>
                        {vehicleStatuses.map((status) => (
                            <MenuItem key={status.vehicleStatusDescription} value={status.vehicleStatusName}>
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