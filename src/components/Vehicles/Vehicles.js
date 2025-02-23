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
        // home: online felhasznalo counter fix, jarmuvek chart fix, note fix
        // profile tab: image megcsinalas, letoltes gomb megcsinalasa, profile status change 
        // worker: image mutassa, az adott role tudja editelni,hozzaadni
        // vehicle: csak azokat a typeokat mutassa amik vannak?, allapotot mutassa, status change, image mutassa, hozzadas
        // problem: contextbe ujrairas, beosztashoz tartozo, problem add, edit, torol, csak ranghoz, lezar mindenki
        // chat: ne legyen buta, tudja folytatni a beszelgetest
        // logout: nullazza a tokent, user profilet.    
        // beosztáshoz tartozó problémák megvalósítása

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
