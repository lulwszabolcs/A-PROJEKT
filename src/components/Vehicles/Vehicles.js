import { TypeProvider } from "../../contexts/TypeProvider"
import { VehicleProvider } from "../../contexts/VehicleProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        // homepage implement: grafikonok, stb 
        //                     activity beállítás usernél
        //                     sticky notes hagyás lehetőség
        //worker edit
        //snackbar context 
        // Hibak: pipánál put helyett pacth, 
        //profile tab
        // add user tab
        // beosztáshoz tartozó problémák megvalósítása
        //logout, sikeres loginnál kapjon tokent, átirányítson a homepagere, értesítsen ha nem jó
        // errornal problemtypes lekérdezés helyett ocntext
        <>
        <MiniDrawer></MiniDrawer>
            <TypeProvider>
        <VehicleProvider>
                <VehicleList></VehicleList>
        </VehicleProvider>
            </TypeProvider>
        </>
    )
}
