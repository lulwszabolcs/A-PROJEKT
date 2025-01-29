import styles from './ProfileCard.module.css'
export default function ProfileCard() {
    return ( 
        <div className={styles.cardcontainer}>
            <img src='http://localhost:8080/images/95.jpg' className={styles.profilepic}></img>
            <h2>Szilágyi Faszfétises</h2>
            <p className={styles.infotext}>101</p>
            <p className={styles.infotext}>Jetway operátor</p>
            <p className={styles.infotext}>szilagyisz@faszfetis.hu</p>
            <p className={styles.infotext}>+36 70 707 8088</p>
        </div>
    )
}