import styles from './VehicleList.module.css'
export default function VehicleList() {
    return (
        <>
        <h1 className={styles.vehicleTitle}>  
        Járművek
        </h1>   
        <div className={styles.flexbox}>
            <div className={styles.vehicleCard}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>Jármű neve</h4>
                    <p>Jármű típusa</p>
                    <p>Jármű év</p>
                    <p>Jármű status</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src='https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/256x256/CarGrey.png' className={styles.vehicleImage}></img>
                </div>
            </div>
        </div>
        </>
    )
}