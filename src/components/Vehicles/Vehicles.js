import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        // vehicle:   role alapjan update torles hozzaadas, osszes jarmu listazasa,
        // hibák editelésénél problem type kiválasztása, meg hogy működjön egyáltalán
        //worker image megcsinalas
        
        
        // hiba hozzáadásnál ki lehessen választani a problem typeot, 
        // beosztáshoz tartozó problémák megvalósítása
        // Hibak: pipánál put helyett pacth, 
        //logout, sikeres loginnál kapjon tokent, átirányítson a homepagere, értesítsen ha nem jó
        // homepage implement: grafikonok, stb 
        <>
        <MiniDrawer></MiniDrawer>
        <VehicleList></VehicleList>
        </>
    )
}
