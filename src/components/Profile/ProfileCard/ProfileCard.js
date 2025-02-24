import styles from './ProfileCard.module.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserProvider';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import DownloadIcon from '@mui/icons-material/Download';
import { ImageContext } from '../../../contexts/ImageProvider';
import { WorkerContext } from '../../../contexts/WorkerProvider';
export default function ProfileCard() {
    let {userProfile} = useContext(UserContext)
    let {pickImageForWorker} = useContext(ImageContext)
    let {SnackbarOpen,SnackbarMessage,closeSnackbar,SnackbarSuccess} = useContext(SnackbarContext)
    const [workerImageUrl,setWorkerImageUrl] = useState("");
    async function loadWorkerImage(worker) {
        setWorkerImageUrl(await pickImageForWorker(worker))
    }
    useEffect(()=>{
        console.log(userProfile)
        loadWorkerImage(userProfile.workerId)
    },[userProfile])
    return ( 
         <>
        <div className={styles.cardcontainer}>
            <DownloadIcon className={styles.downloadicon} sx={{color:'gray'}}/>
            <img src={workerImageUrl} className={styles.profilepic}></img>
            <h2>{userProfile.name}</h2>
            <p className={styles.infotext}>{userProfile.workerId}</p>
            <p className={styles.infotext}>{userProfile.role}</p>
            <p className={styles.infotext}>{userProfile.email}</p>
             <p className={styles.infotext}>{userProfile.phoneNumber}</p>
         </div>
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/> 
            </>
    )
}