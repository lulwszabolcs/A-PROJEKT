import { useContext, useEffect, useState } from 'react'
import styles from './VehicleList.module.css'
import { VehicleContext, VehicleProvider } from '../../../contexts/VehicleProvider'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { TypeContext, TypeProvider } from '../../../contexts/TypeProvider';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Addproblem from '../../Errors/AddProblem/Addproblem';
import VehicleModify from '../VehicleModify/VehicleModify';
import AddVehicle from '../AddVehicle/AddVehicle';
export default function VehicleList() {
    let {vehicles,getVehicles} = useContext(VehicleContext)
    let {vehicleTypes,vehicleStatuses} = useContext(TypeContext)
    const [isAddProblemOpen,setIsAddProblemOpen] = useState(false)
    const [isAddVehicleOpen,setIsAddVehicleOpen] = useState(false)
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    function closeAddProblem() {
        setIsAddProblemOpen(false);
    }
    function closeAddVehicle() {
        setIsAddVehicleOpen(false);
    }
    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesType = selectedType === 'all' || vehicle.type === selectedType;
        const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus;
        return matchesType && matchesStatus;
    });
    return (
        <>
        <h1 className={styles.vehicleTitle}>  
        Járművek
        </h1>   
        <div className={styles.filtervehicles}>
        <Select style={{width:'20vw'}}
            labelId="demo-simple-select"
            id="demo-simple-select"
            onChange={(e) => setSelectedType(e.target.value)}
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
            onChange={(e) => setSelectedStatus(e.target.value)}
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
        <ReportProblemIcon onClick={()=>setIsAddProblemOpen(true)} className={styles.reporticon}></ReportProblemIcon>
        </div>
        <div className={styles.flexbox}>
        {filteredVehicles.map((vehicle)=>(
            <div className={styles.vehicleCard}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.vehicleYear}</p>
                    <p style={{color: vehicle.status === 'Működőképes' ? 'green' : 'orange'}}>{vehicle.status}</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src='https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/256x256/CarGrey.png' className={styles.vehicleImage}></img>
                </div>
            </div>
        ))}
        </div>
        <div className={styles.addicon}>
        <Fab color="primary" aria-label="add">
            <AddIcon onClick={()=>setIsAddVehicleOpen(true)} />
        </Fab>
        </div>
        <Modal open={isAddProblemOpen}>
            <TypeProvider>
            <VehicleProvider>
            <VehicleModify close={closeAddProblem}></VehicleModify>
            </VehicleProvider>
            </TypeProvider>
        </Modal>
        <Modal open={isAddVehicleOpen}>
            <TypeProvider>
            <VehicleProvider>
            <AddVehicle close={closeAddVehicle}></AddVehicle>
            </VehicleProvider>
            </TypeProvider>
        </Modal>
        </>

    )
}