import styles from './SupportChat.module.css'
import TextField from '@mui/material/TextField';

export default function SupportChat() {
    return (
        <div className={styles.flexbox}>
        <h1 style={{marginTop:'10vh'}}>Chat</h1>

        <div className={styles.chatmaincontainer}>
            <div className={styles.messagecontainer}>
                <div className={styles.usertextcontainer}>
                    <p className={styles.usertext}>dasdasdasdasadsdsadas</p>
                </div>
                <div className={styles.systemtextcontainer}>
                    <p className={styles.systemtext}>dasdasdasasdasddasdasdas</p>
                </div>
                <div className={styles.usertextcontainer}>
                    <p className={styles.usertext}>dasdasdasdasadsdsadas</p>
                </div>
            </div>
            <div className={styles.sendcontainer}>
            <TextField id="outlined-multiline-static" multiline variant="outlined" className={styles.chatinput}  rows={2}/>
            </div>
        </div>
        </div>
    )
}