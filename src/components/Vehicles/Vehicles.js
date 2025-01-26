import { VehicleProvider } from "../../contexts/VehicleProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        // homepage implement: grafikonok, stb 
        //worker image megcsinalas
        // vehicle:   role alapjan update torles hozzaadas, osszes jarmu listazasa,
        //snackbar context 
        // Hibak: pipánál put helyett pacth, 
        
        // beosztáshoz tartozó problémák megvalósítása
        //logout, sikeres loginnál kapjon tokent, átirányítson a homepagere, értesítsen ha nem jó
        <>
        <MiniDrawer></MiniDrawer>
        <VehicleProvider>
            <VehicleList></VehicleList>
        </VehicleProvider>
        </>
    )
}
