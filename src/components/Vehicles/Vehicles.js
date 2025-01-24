import { VehicleProvider } from "../../contexts/VehicleProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        //worker image megcsinalas
        // Hibak: pipánál put helyett pacth, 
        // homepage implement: grafikonok, stb 
        //snackbar context 
        // worker detail beosztas select
        // vehicle:   role alapjan update torles hozzaadas, osszes jarmu listazasa,
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
