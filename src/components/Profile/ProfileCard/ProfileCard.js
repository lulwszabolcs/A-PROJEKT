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
export default function ProfileCard() {
    let {userProfile} = useContext(UserContext)
    return ( 
         <>
        <div className={styles.cardcontainer}>
            <DownloadIcon className={styles.downloadicon} sx={{color:'gray'}}/>
            <img src={`http://localhost:8080/images/${userProfile.workerId}.jpg`} className={styles.profilepic}></img>
            <h2>{userProfile.name}</h2>
            <p className={styles.infotext}>{userProfile.workerId}</p>
            <p className={styles.infotext}>{userProfile.role}</p>
            <p className={styles.infotext}>{userProfile.email}</p>
             <p className={styles.infotext}>{userProfile.phoneNumber}</p>
         </div>
            </>
    )
}