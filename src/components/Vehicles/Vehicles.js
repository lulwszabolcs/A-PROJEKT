import { ImageProvider } from "../../contexts/ImageProvider"
import { SnackbarProvider } from "../../contexts/SnackbarProvider"
import { TypeProvider } from "../../contexts/TypeProvider"
import { UserProvider } from "../../contexts/UserProvider"
import { VehicleProvider } from "../../contexts/VehicleProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
import styles from './Vehicles.module.css'
export default function Vehicles() {
    return (
        // profile tab: letoltes gomb megcsinalasa
        // chat: ne legyen buta, tudja folytatni a beszelgetest
        // reszponzivitas, atiras vite-re?
        <>
        <MiniDrawer></MiniDrawer>
            <SnackbarProvider>
                        <ImageProvider>
                    <VehicleList></VehicleList>
                        </ImageProvider>
            </SnackbarProvider>
        </>
    )
}
