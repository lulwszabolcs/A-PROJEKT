import { useContext } from 'react'
import styles from './VehicleList.module.css'
import { VehicleContext } from '../../../contexts/VehicleProvider'
export default function VehicleList() {
    let {vehicles} = useContext(VehicleContext)
    return (
        <>
        <h1 className={styles.vehicleTitle}>  
        Járművek
        </h1>   
        <div className={styles.flexbox}>
        {vehicles.map((vehicle)=>(
            <div className={styles.vehicleCard}>
                <div className={styles.vehicleInfoContainer}>
                    <h4>{vehicle.name}</h4>
                    <p>{vehicle.type}</p>
                    <p>{vehicle.vehicleYear}</p>
                    <p>{vehicle.status}</p>
                </div>
                <div className={styles.vehicleImageContainer}>
                <img src='https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/256x256/CarGrey.png' className={styles.vehicleImage}></img>
                </div>
            </div>
        ))}
        </div>
        
        </>
    )
}