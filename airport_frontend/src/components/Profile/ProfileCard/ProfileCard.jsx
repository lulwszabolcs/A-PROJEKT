import styles from './ProfileCard.module.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserProvider';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import DownloadIcon from '@mui/icons-material/Download';
import { ImageContext } from '../../../contexts/ImageProvider';

export default function ProfileCard() {
    let {userProfile,generatePdfFileForUser} = useContext(UserContext)
    let {pickImageForWorker} = useContext(ImageContext)
    let {SnackbarOpen,SnackbarMessage,closeSnackbar,SnackbarSuccess} = useContext(SnackbarContext)

    const [workerImageUrl,setWorkerImageUrl] = useState("");
    async function loadWorkerImage(worker) {
        setWorkerImageUrl(await pickImageForWorker(worker))
    }
    useEffect(()=>{
        loadWorkerImage(userProfile.workerId)
    },[userProfile])
    return ( 
        <>
            <div className={styles.cardcontainer}>
                <DownloadIcon className={styles.downloadicon} sx={{color:'gray'}} onClick={()=>generatePdfFileForUser(userProfile.userId)} data-testid={"downloadIcon"}/>
                <img src={workerImageUrl} className={styles.profilepic} data-testid={"profilePicture"}></img>
                <h2 data-testid={"nameField"}>{userProfile.name}</h2>
                <p className={styles.infotext} data-testid={"roleField"}>{userProfile.role}</p>
                <p className={styles.infotext} data-testid={"emailField"}>{userProfile.email}</p>
                <p className={styles.infotext} data-testid={"phoneNumberField"}>{userProfile.phoneNumber}</p>
            </div>
            <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/> 
        </>
    )
}