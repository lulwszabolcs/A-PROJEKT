import { VehicleProvider } from "../../contexts/VehicleProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        // vehicle:   role alapjan update torles hozzaadas, osszes jarmu listazasa,
        //worker image megcsinalas
        
        // beosztáshoz tartozó problémák megvalósítása
        // Hibak: pipánál put helyett pacth, 
        //logout, sikeres loginnál kapjon tokent, átirányítson a homepagere, értesítsen ha nem jó
        // homepage implement: grafikonok, stb 
        //snackbar context 
        <>
        <MiniDrawer></MiniDrawer>
        <VehicleProvider>
            <VehicleList></VehicleList>
        </VehicleProvider>
        </>
    )
}
