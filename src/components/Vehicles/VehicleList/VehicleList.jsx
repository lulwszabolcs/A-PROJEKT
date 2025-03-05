import { useContext, useEffect, useState } from 'react'
import styles from './VehicleList.module.css'
import {VehicleContext} from '../../../contexts/VehicleProvider'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {MenuItem, Modal, Select, useMediaQuery} from '@mui/material';
import {TypeContext} from '../../../contexts/TypeProvider';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VehicleModify from '../VehicleModify/VehicleModify';
import AddVehicle from '../AddVehicle/AddVehicle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BuildIcon from '@mui/icons-material/Build';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import { ImageContext } from '../../../contexts/ImageProvider';

export default function VehicleList() {
    let { vehicles } = useContext(VehicleContext)
    let {pickImageForVehicle} = useContext(ImageContext)
    let {vehicleTypes,vehicleStatuses} = useContext(TypeContext)
    let {SnackbarOpen,SnackbarMessage,closeSnackbar,SnackbarSuccess} = useContext(SnackbarContext)
    const [isAddProblemOpen,setIsAddProblemOpen] = useState(false)
    const [isAddVehicleOpen,setIsAddVehicleOpen] = useState(false)
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [imageUrls, setImageUrls] = useState({});
    const isSmallScreen = useMediaQuery('(max-width: 425px)');
    const isMobile = useMediaQuery('(max-width: 1024px)');

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
        const loadImages = async () => {
          const urls = {};
          for (const vehicle of vehicles) {
            urls[vehicle.vehicleId] = await pickImageForVehicle(vehicle.type);
          }
          setImageUrls(urls);
        };
    
        if (vehicles.length > 0) {
          loadImages();
        }
      }, [pickImageForVehicle]);
    
    return (
        <>
        <h1 className={styles.vehicleTitle}>  
        Járművek
        </h1>   
        <div className={styles.filtervehicles}>
        <Select style={{width: isMobile ? '50vw':'20vw'}}
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
        <Select style={{width: isMobile ? '50vw':'20vw'}}
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
        <ReportProblemIcon onClick={()=>setIsAddProblemOpen(true)} className={styles.reporticon} sx={{color:'red',fontSize:'40px'}}></ReportProblemIcon>
        </div>
        <div className={styles.flexbox}>
        {filteredVehicles.sort((a,b)=>(a.license.localeCompare(b.license))).map((vehicle)=>(
            <div className={styles.vehicleCard} key={vehicle.vehicleId} style={{width:isSmallScreen ? '60vw':undefined}}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.license}</p>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.vehicleYear}</p>
                    <p>{pickIcon(vehicle)}</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src={imageUrls[vehicle.vehicleId]} className={styles.vehicleImage}></img>
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
            <VehicleModify close={closeAddProblem}></VehicleModify>
        </Modal>
        <Modal open={isAddVehicleOpen}>
            <AddVehicle close={closeAddVehicle}></AddVehicle>
        </Modal>
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
        </>

    )
}