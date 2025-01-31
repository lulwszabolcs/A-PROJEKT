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
export default function ProfileCard() {
    let {changeUserStatus} = useContext(UserContext)
    let {SnackbarOpen,closeSnackbar,SnackbarMessage} = useContext(SnackbarContext)
    const actions = [
        { icon: <HomeIcon />, name: 'Szabadságon' },
        { icon: <BedtimeIcon onClick={()=>changeUserStatus(74,"OFFLINE")} />, name: 'Offline' },
        { icon: <NotificationsActiveIcon onClick={()=>changeUserStatus(74,"ONLINE")} />, name: 'Online' },
      ];
    return ( 
        <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 36, right: 36 }}
        color='#ce92d9'
        icon={<NotificationsIcon />}
        FabProps={{
            sx: {
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.main',
              }
            }
        }}
        >
        {actions.map((action) => (
          <SpeedDialAction
          key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

        <div className={styles.cardcontainer}>
            <img src='http://localhost:8080/images/95.jpg' className={styles.profilepic}></img>
            <h2>Szilágyi Faszfétises</h2>
            <p className={styles.infotext}>101</p>
            <p className={styles.infotext}>Jetway operátor</p>
            <p className={styles.infotext}>szilagyisz@faszfetis.hu</p>
            <p className={styles.infotext}>+36 70 707 8088</p>
        </div>
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar}/>
            </>
    )
}