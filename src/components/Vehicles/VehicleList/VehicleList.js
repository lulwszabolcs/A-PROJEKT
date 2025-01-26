import { useContext } from 'react'
import styles from './VehicleList.module.css'
import { VehicleContext } from '../../../contexts/VehicleProvider'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { TypeContext } from '../../../contexts/TypeProvider';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
export default function VehicleList() {
    let {vehicles} = useContext(VehicleContext)
    let {vehicleTypes,vehicleStatuses} = useContext(TypeContext)
    return (
        <>
        <h1 className={styles.vehicleTitle}>  
        Járművek
        </h1>   
        <div className={styles.filtervehicles}>
        <Select style={{width:'20vw'}}
            labelId="demo-simple-select"
            id="demo-simple-select"
            onChange={()=>console.log("ping")}
            defaultValue={"all"}
            > 
            <MenuItem value={"all"}>
                Minden típus
            </MenuItem>
                {vehicleTypes.map((type)=>(
                    <MenuItem value={type.vehicleTypeDescription} key={type.vehicleTypeDescription}>
                        {type.vehicleTypeDescription}
                    </MenuItem>
                ))}
        </Select>
        <Select style={{width:'20vw'}}
            labelId="demo-simple-select"
            id="demo-simple-select"
            onChange={()=>console.log("ping")}
            defaultValue={"all"}
            > 
            <MenuItem value={"all"}>
                Minden állapot
            </MenuItem>
            {vehicleStatuses.map((status)=>(
                    <MenuItem value={status.vehicleStatusDescription} key={status.vehicleStatusDescription}>
                        {status.vehicleStatusDescription}
                    </MenuItem>
                ))}
        </Select>
        <ReportProblemIcon></ReportProblemIcon>
        </div>
        <div className={styles.flexbox}>
        {vehicles.map((vehicle)=>(
            <div className={styles.vehicleCard}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>{vehicle.name} <i>#{vehicle.vehicleId}</i></h4>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.vehicleYear}</p>
                    <p style={{color: vehicle.status === 'Jármű működőképes' ? 'green' : 'orange'}}>{vehicle.status}</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src='https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/256x256/CarGrey.png' className={styles.vehicleImage}></img>
                </div>
            </div>
        ))}
        </div>
        <div className={styles.addicon}>
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        </div>
        </>
    )
}