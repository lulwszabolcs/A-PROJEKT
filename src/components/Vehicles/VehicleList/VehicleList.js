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
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BuildIcon from '@mui/icons-material/Build';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

export default function VehicleList() {
    let {vehicles,getVehicles,setVehicles,pickImage} = useContext(VehicleContext)
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
    function pickIcon(vehicle) {
        switch (vehicle.status) {
            case "Működőképes":
                return <p className={styles.vehiclestatus} style={{color:'green'}}>{vehicle.status}<CheckCircleIcon/></p>
            case "Karbantartás alatt":
                return <p className={styles.vehiclestatus} style={{color:'gray'}}>{vehicle.status}<ReportIcon/></p>
            case "Javítás alatt":
                return <p className={styles.vehiclestatus} style={{color:'gray'}}>{vehicle.status}<BuildIcon/></p>
            case "Üzemen kívül":
                return <p className={styles.vehiclestatus} style={{color:'red'}}>{vehicle.status}<RemoveCircleIcon/></p>
            case "Várakozik a szemlére":
                return <p className={styles.vehiclestatus} style={{color:'brown'}}>{vehicle.status}<LowPriorityIcon/></p>
            case "Tankolás alatt":
                return <p className={styles.vehiclestatus} style={{color:'orange'}}>{vehicle.status}<LocalGasStationIcon/></p>
            case "Tisztítás alatt":
                return <p className={styles.vehiclestatus} style={{color:'blue'}}>{vehicle.status}<LocalCarWashIcon/></p>
            case "Szemlén van":
                return <p className={styles.vehiclestatus} style={{color:'brown'}}>{vehicle.status}<FormatListBulletedIcon/></p>
        
            default:
                break;
        }
    }
    useEffect(() => {
        console.log("Vehicles állapot változott:", vehicles);
      }, [vehicles]);
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
        <ReportProblemIcon onClick={()=>setIsAddProblemOpen(true)} className={styles.reporticon} sx={{color:'red'}}></ReportProblemIcon>
        </div>
        <div className={styles.flexbox}>
        {filteredVehicles.map((vehicle)=>(
            <div className={styles.vehicleCard} key={vehicle.vehicleId}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.license}</p>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.vehicleYear}</p>
                    <p>{pickIcon(vehicle)}</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src={pickImage(vehicle)} className={styles.vehicleImage}></img>
                {console.log(pickImage(vehicle))}
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