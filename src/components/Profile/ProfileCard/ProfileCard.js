import styles from './ProfileCard.module.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeIcon from '@mui/icons-material/Home';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserProvider';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import DownloadIcon from '@mui/icons-material/Download';
export default function ProfileCard() {
    return ( 
        <>
        <div className={styles.cardcontainer}>
            <DownloadIcon className={styles.downloadicon} sx={{color:'gray'}}/>
            <img src='http://localhost:8080/images/95.jpg' className={styles.profilepic}></img>
            <h2>Szilágyi Faszfétises</h2>
            <p className={styles.infotext}>#101</p>
            <p className={styles.infotext}>Jetway operátor</p>
            <p className={styles.infotext}>szilagyisz@faszfetis.hu</p>
            <p className={styles.infotext}>+36 70 707 8088</p>
        </div>
            </>
    )
}